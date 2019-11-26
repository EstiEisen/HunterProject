import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

import { UserService } from 'app/shared/_services/http/user.service';
import { EmployerService } from 'app/shared/_services/http/employer.service';
import { OrganizationService } from 'app/shared/_services/http/organization.service';

import { UserUnitPermission } from 'app/shared/_models/user-unit-permission.model';
import { ModuleTypes } from 'app/shared/_models/user-module.model';
import { Department } from 'app/shared/_models/department.model';
import { Employer } from 'app/shared/_models/employer.model';
import { EntityRoles } from 'app/shared/_models/user.model';
import { User } from 'app/shared/_models/user.model';
import { fade } from 'app/shared/_animations/animation';
import { DataTableComponent } from 'app/shared/data-table/data-table.component';
import { DataTableResponse } from 'app/shared/data-table/classes/data-table-response';
import { NotificationService } from 'app/shared/_services/notification.service';
import { SelectUnitService } from 'app/shared/_services/select-unit.service';
import { MatDialog } from '@angular/material';
import { ChangeProjectManagerComponent } from './change-project-manager/change-project-manager.component';
// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
// import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styles: [`.check-module { width: 140px; } .displayNone{ display: none}
  ::ng-deep .change-projectManager-component .mat-dialog-container { overflow: visible; }` ],
  animations: [ fade ]
})
export class UserFormComponent implements OnInit {

  @ViewChild(DataTableComponent) dataTable: DataTableComponent;


  user = new User(null);
  permission = new UserUnitPermission();
  hasServerError: boolean;
  organizations = [];
  departments = [];
  employers = [];
  employees = [];
  message: string;
  moduleTypes = ModuleTypes;
  update = false;
  add = false;

  roles = Object.keys(EntityRoles).map(function (e) {
    return {id: e, name: EntityRoles[e]};
  });


  readonly columns =  [
    { name: 'org', label: 'שם ארגון', searchable: false},
    { name: 'emp', label: 'שם מעסיק', searchOptions: false},
    { name: 'dep', label: 'שם מחלקה' , searchable: false}
  ];


  constructor(private route: ActivatedRoute,
              private employerService: EmployerService,
              private router: Router,
              private userService: UserService,
              private organizationService: OrganizationService,
              private notificationService: NotificationService,
              private selectUnit: SelectUnitService,
              private dialog: MatDialog,
              private _location: Location) {
    // ClassicEditor
    //   .create( document.querySelector( '#editor' ), {
    //     // plugins: [ Essentials, Paragraph, Bold, Italic, Alignment ],     // <--- MODIFIED
    //     toolbar: [ 'bold', 'italic', 'alignment' ]                       // <--- MODIFIED
    //   } )
    //   .then( editor => {
    //     console.log( 'Editor was initialized', editor );
    //   } )
    //   .catch( error => {
    //     console.error( error.stack );
    //   } );
  }

  ngOnInit() {
    this.organizations = this.selectUnit.getOrganizations();
    if (this.route.snapshot.data.user) {
      this.update = true;
      this.user = new User(this.route.snapshot.data.user);
    }
  }

  fetchItems() {
    if (!this.user.units || this.user.units.length === 0) {
      this.user.units = [];
    }

    this.addToUnitUser(this.user.units);
  }

  selectedEmployer(): Employer[] {
    if (this.organizations.length > 0) {
      const selectedOrganization = this.organizations.find(o => {
        return +o.id === +this.permission.organization_id;
      });

      this.employers = selectedOrganization ? selectedOrganization.employer : [];
      if (!this.employers.some(n => n.id === this.permission.employer_id)) {
        this.permission.employer_id = null;
        this.permission.departments = null;
      }
      return this.employers;
    }
    this.employers = [];
    return [];
  }

  selectedDepartment(): Department[] {
    const selectedEmployer = this.employers;

    if (selectedEmployer) {
      const selectedDepartment = (<Employer[]>selectedEmployer).find(e => {
        return +e.id === +this.permission.employer_id;
      });

      if (selectedDepartment) {
        if (this.permission.departments) {
          const isDepartments = this.permission.departments.filter(de => {
            return selectedDepartment.department.find(d => d.id === de);
          });
          if (isDepartments.length === 0) {
            this.permission.departments = null;
          }
        }
        return selectedDepartment.department;
      }
    }
    return [];
  }

  submit(form: NgForm): void {
    this.hasServerError = false;
    if (form.valid) {
      if (this.user.modules.some(m => m.isEnabled) &&
        ((this.user.units.length > 0 && this.user.units[0].organization_id) || this.user.role === 'admin')) {
        if (this.user.id) {
          this.userService.updateUser(this.user, this.user.id).then(response => this.handleResponse(response));
        } else {
          this.userService.saveNewUser(this.user).then(response => this.handleResponse(response));
        }
      }
    }
  }

  changeProjectManager(): void {
    if (this.dataTable.criteria.checkedItems.length === 0 && !this.dataTable.criteria.isCheckAll) {
      this.dataTable.setNoneCheckedWarning();
      return;
    }

    const items = this.dataTable.criteria.checkedItems.map(item => item['permission_id']);

    const dialog = this.dialog.open(ChangeProjectManagerComponent,
      {
        data: {  'items': items,
          'isCheckAll': this.dataTable.criteria.isCheckAll,
          'userId': this.user.id},
        width: '450px',
        panelClass: 'change-projectManager-component'
      });


    dialog.afterClosed().subscribe(
      data => {
        if (data) {
          this.addToUnitUser(data);
        }
      });
  }

  removeUnitPermissionRow(id): void {
    const buttons = {confirmButtonText: 'כן', cancelButtonText: 'לא'};
    this.notificationService.warning('האם ברצונך לבצע מחיקה', '' , buttons).then(confirmation => {
      if (confirmation.value) {
        this.userService.deleteUnitUser(id).then(response => {
          if (response) {
            this.addToUnitUser(this.user.units.filter(u => u.permission_id !== id));
          }
        });
      }
    });
  }

  addUnitPermissionRow(): void {
    this.userService.addUnitUser(this.permission, this.user.id).then(response => {
      if (response) {
        this.addToUnitUser(response);
      }
    });
  }

  addToUnitUser(items): void {
    this.user.units = items;
    this.permission = new UserUnitPermission();
    const d = new DataTableResponse(this.user.units, this.user.units.length, 1);
    this.dataTable.criteria.limit = this.user.units.length;
    this.dataTable.setItems(d, 'permission_id');
  }

  private handleResponse(isSaved: any): void {
    this.message = isSaved['message'];
    if (this.message === 'username_exist') {
      this.hasServerError = true;
      this.message = 'שם משתמש קיים';
    } else {
      if (this.message === 'failed') {
        this.hasServerError = true;
        this.message = 'שגיאת שרת, נסה שנית או צור קשר.';
      } else {
        this.previous();
      }
    }
  }

  previous(): void {
    this._location.back();
  }

  hasDisabled(index: number): boolean {
    if (this.user.role === 'admin') {
      this.user.modules[index].permission_type = 'all';
      return true;
    }
    return false;
  }
}
