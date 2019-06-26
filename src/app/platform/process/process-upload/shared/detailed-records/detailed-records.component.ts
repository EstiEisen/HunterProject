import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { MatDialog } from '@angular/material';


import {DefrayalError, DepositStatus, DepositType, EmployeeStatus} from 'app/shared/_models/monthly-transfer-block';
import { MonthlyTransferBlockService } from 'app/shared/_services/http/monthly-transfer-block';
import { DataTableResponse } from 'app/shared/data-table/classes/data-table-response';
import { GroupTransferComponent } from '../group-transfer/group-transfer.component';
import { NotificationService } from 'app/shared/_services/notification.service';
import { DataTableComponent } from 'app/shared/data-table/data-table.component';
import { ProcessDataService } from 'app/shared/_services/process-data-service';
import { UserSessionService } from 'app/shared/_services/user-session.service';
import { SelectUnitService } from 'app/shared/_services/select-unit.service';
import { ProductType } from 'app/shared/_models/product.model';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detailed-records',
  templateUrl: './detailed-records.component.html',
  styleUrls: ['./detailed-records.component.css']
})
export class DetailedRecordsComponent implements OnInit , OnDestroy {

  @ViewChild(DataTableComponent) dataTable: DataTableComponent;

  @Input() items = [];

  nameEmployerProductCode = 'product_id';
  nameEmployeeName = 'employee_id';
  title: string;

  depositType = Object.keys(DepositType).map(function(e) {
    return { id: e, name: DepositType[e] };
  });

  permissionsType = this.userSession.getPermissionsType('operations');
  readonly columns =  [
    { name: this.nameEmployeeName , sortName: 'employee_chr__employee__first_name', label: 'שם העובד' , searchOptions: { labels: [] }},
    { name: 'personal_id',  sortName: 'employee_chr__employee__identifier', label: 'תעודת זהות' , searchable: false },
    { name: 'deposit_type', label: 'סוג תקבול' , searchOptions: { labels: this.depositType } },
    { name: this.nameEmployerProductCode , sortName: 'employer_product__code', label: 'מספר קופה בשכר',
      subLabel: 'שם קופה', searchOptions: { labels: [] } },
    { name: 'employer_product_name', sortName: 'employer_product__code', label: 'שם קופה בשכר' , searchable: false },
    { name: 'employer_product_type', sortName: 'employer_product__type', label: 'סוג קופה' , searchable: false },
    { name: 'deposit_status', isSort: false , label: 'מעמד' , searchable: false },
    { name: 'employee_status', isSort: false , label: 'סטטוס' , searchable: false },
    { name: 'product_code', sortName: 'employer_product__product__code', label: 'מ"ה' , searchable: false },
    { name: 'payment_month', isSort: false, label: 'חודש ייחוס' , searchable: false },
    { name: 'salary', label: 'שכר' , searchable: false},
    { name: 'sum_compensation', isSort: false, label: 'פיצויים' , searchable: false },
    { name: 'sum_employer_benefits', isSort: false, label: 'הפרשת מעסיק' , searchable: false },
    { name: 'sum_employee_benefits', isSort: false, label:  'הפרשת עובד' , searchable: false } ,
    { name: 'amount', isSort: false, label: 'סה"כ' , searchable: false }
  ];

  constructor(public route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              public processDataService: ProcessDataService,
              public userSession: UserSessionService,
              private  monthlyTransferBlockService: MonthlyTransferBlockService ,
              protected  notificationService: NotificationService,
              private selectUnitService: SelectUnitService) { }
  sub = new Subscription;

  depositStatus = DepositStatus;
  employeeStatus = EmployeeStatus;
  depositTypes = DepositType;
  defrayalError = DefrayalError;
  productType = ProductType;
  records_id = 0;
  highlightRecordId: number;
  organizationId: number;

  ngOnInit() {
    this.organizationId = this.selectUnitService.currentOrganizationID;

    if (this.processDataService.activeProcess === undefined) {
      this.processDataService = this.selectUnitService.getProcessData();
    }

    this.records_id = this.route.snapshot.params['id'];
    this.records_id =  this.records_id === undefined ? 0 :  this.records_id;

    this.monthlyTransferBlockService.getEntity(this.processDataService.activeProcess.processID,  this.records_id)
      .then(response => {
        let column = this.dataTable.searchColumn(this.nameEmployeeName);
        column['searchOptions'].labels = response['employees'];
        column = this.dataTable.searchColumn(this.nameEmployerProductCode);
        column['searchOptions'].labels = response['products'];
      });
    // this.highlightRecordId = this.processDataService.activeProcess.highlightRecordId !== undefined ?
    //   this.processDataService.activeProcess.highlightRecordId : 0;
  }

  fetchItems() {
    if (this.organizationId !== this.selectUnitService.currentOrganizationID) {
      this.router.navigate(['/platform', 'process', 'table']);
    }
    if (this.items.length <= 0) {
      this.dataTable.criteria.filters['processId'] = this.processDataService.activeProcess.processID;
      if (this.records_id !== 0) {
        this.dataTable.criteria.filters['recordsId'] = this.records_id;
      }
      if (this.processDataService.activeProcess.incorrect) {
        this.dataTable.criteria.filters['incorrect'] = this.processDataService.activeProcess.incorrect;
      }
      if (this.processDataService.activeProcess.highlightRecordId !== undefined) {
        this.dataTable.criteria.filters['highlightRecordId'] = this.processDataService.activeProcess.highlightRecordId;
      }
      this.monthlyTransferBlockService.getMonthlyList(this.dataTable.criteria)
        .then(response => {
          if (response.items.length > 0) {
            this.dataTable.setItems(response);
          } else {
            if (this.processDataService.activeProcess.pageNumber === 4 || this.processDataService.activeProcess.pageNumber === 5) {
              this.router.navigate(['/platform', 'process', 'new', 1, 'broadcast']);
            } else {
              this.router.navigate(['/platform', 'process', 'new', 1 , 'payment', this.processDataService.activeProcess.processID]);
            }
          }
        });
    } else {
      const data = new DataTableResponse( this.items, 1, this.items.length);
      this.dataTable.setItems(data);
    }
  }

  openGroupTransferDialog(): void {
    if (this.checkedRowItems()) {
      if (this.isLockedBroadcast()) {
          const items = this.dataTable.criteria.isCheckAll ? this.dataTable.items : this.dataTable.criteria.checkedItems
          const ids = items.map(item => item['id']);
          const dialog = this.dialog.open(GroupTransferComponent, {
            data: { 'ids': ids,
              'processId': this.processDataService.activeProcess.processID, 'type': 'mtb'
            },
            width: '800px',
            panelClass: 'dialog-file'
          });
          this.sub.add(dialog.afterClosed().subscribe(() => {
            this.fetchItems();
          }));
      }else {
        this.notificationService.error('', 'אין אפשרות לעדכן רשומה נעולה');
      }
    }
  }

  checkedRowItems(): boolean {
    if (this.dataTable.criteria.checkedItems.length === 0 && !this.dataTable.criteria.isCheckAll) {
      this.dataTable.setNoneCheckedWarning();
      return false;
    }
    return true;
  }

  openWarningMessageComponentDialog(type: boolean): void {
    const title = type ? 'לא רלונטי' : 'מחיקת שורות';
    const body = type ? 'האם ברצונך להפוך שורת אלו ללא רלונטית?' : 'האם ברצונך למחוק שורת אלו?';
    const typeData = type ? 'notRelevant' : 'delete';
    if (this.checkedRowItems()) {
      if (this.isLockedBroadcast()) {
        const buttons = {confirmButtonText: 'כן', cancelButtonText: 'לא'};
        const items = this.dataTable.criteria.isCheckAll ? this.dataTable.items : this.dataTable.criteria.checkedItems;

        this.notificationService.warning(title, body, buttons).then(confirmation => {
          if (confirmation.value) {
            this.monthlyTransferBlockService.update(typeData, '', items.map(item => item['id']))
              .then(response => {
                if (response) {
                  this.fetchItems();
                } else {
                  this.notificationService.error('', 'הפעולה נכשלה');
                }
              });
          }
        });
      }else {
        this.notificationService.error('', 'אין אפשרות לעדכן רשומה נעולה');
      }
    }
  }

  editPayments(item: any): void {
      if (item['status'] !== 'sent') {
        this.router.navigate(['platform', 'process' , 'edit-payments', item['id'] ]);
      }
  }

  isLockedBroadcast(): boolean {
    const items = this.dataTable.criteria.isCheckAll ? this.dataTable.items : this.dataTable.criteria.checkedItems;
    if (items.find(item => item['status'] === 'sent')) {
      return false;
    }
    return true;
  }

  getTitleError(errors): string {
    if (this.processDataService.activeProcess.incorrect) {
      return '';
    }
  }

  setColorError(errors , type): boolean {
    const error =  errors.filter(e => type.includes(e.type));
    if (error.length > 0) {
      this.title = error.map(arr => {
        return this.defrayalError[arr.message.replace(/,/g, '').replace(/ /g, '_')];
      });
      return true;
    }
    return false;
  }

  markValid(): void {
    if (this.checkedRowItems()) {
      if (this.isLockedBroadcast()) {
        const items = this.dataTable.criteria.isCheckAll ? this.dataTable.items : this.dataTable.criteria.checkedItems;
        this.monthlyTransferBlockService.markValid(items.map(item => item['id'])).then(r => r);
      } else {
        this.notificationService.error('', 'אין אפשרות לעדכן רשומה נעולה');
      }
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
