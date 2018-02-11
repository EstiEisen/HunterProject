import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataTableComponent } from '../../../shared/data-table/data-table.component';

import { UserSessionService } from '../../../shared/_services/user-session.service';
import { EmployerService } from '../../_services/http/employer.service';

import { DataTableHeader } from '../../../shared/_models/data-table/data-table-header.model';
import { Employer } from '../../../shared/_models/employer.model';

@Component({
  selector: 'app-employers',
  templateUrl: './employers.component.html',
  styleUrls: ['../../../shared/data-table/data-table.component.css']
})
export class EmployersComponent extends DataTableComponent implements OnInit {

  readonly headers: DataTableHeader[] = [
    { column: 'name', label: 'שם מלא' }, { column: 'businessNumber', label: 'ח.פ' }, { column: 'phone', label: 'מס טלפון' },
    { column: 'email', label: 'כתובת מייל' }, { column: 'instituteCode5', label: 'קוד מוסד - 5' },
    { column: 'instituteCode8', label: 'קוד מוסד - 8' },
  ];

  newEmployer: Employer;
  employers: Employer[] = [];

  constructor(protected route: ActivatedRoute, private userSession: UserSessionService, private employerService: EmployerService) {
    super(route);
  }

  ngOnInit() {
    if (sessionStorage.getItem('new-employer')) {
      this.newEmployer = JSON.parse(sessionStorage.getItem('new-employer'));
      sessionStorage.removeItem('new-employer');
    }

    super.ngOnInit();
  }

  fetchItems(): void {
    this.employerService.getEmployers(this.userSession.getUser().token).then(response => this.setItems(response));
  }

}
