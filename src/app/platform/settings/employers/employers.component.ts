import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataTableComponent } from 'app/shared/data-table/data-table.component';

import { EmployerService } from 'app/shared/_services/http/employer.service';

import { DataTableHeader } from 'app/shared/data-table/classes/data-table-header';
// import { EntityTypes } from 'app/shared/_models/employer.model';


@Component({
  selector: 'app-employers',
  templateUrl: './employers.component.html',
  styleUrls: ['../../../shared/data-table/data-table.component.css']
})
export class EmployersComponent extends DataTableComponent {

  // types = EntityTypes;

  readonly headers: DataTableHeader[] =  [
    { column: 'entity_name', label: 'שם מלא' }, { column: 'entity_number', label: 'ח.פ' },
    { column: 'phone', label: 'טלפון' }, { column: 'email', label: 'כתובת מייל' },
    { column: 'code5', label: 'קוד מוסד 5' }, { column: 'code8', label: 'קוד מוסד 8' }
  ];

  constructor(route: ActivatedRoute, private employerService: EmployerService) {
    super(route);
  }

  fetchItems(): void {
   this.employerService.getEmployers().then(response => this.setItems(response));
  }

}