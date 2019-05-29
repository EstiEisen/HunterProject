import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { DepositsReportService } from 'app/shared/_services/http/deposits-report.service';
import { DepartmentService } from 'app/shared/_services/http/department.service';
import { NotificationService } from 'app/shared/_services/notification.service';
import { HelpersService } from 'app/shared/_services/helpers.service';
import { fade } from 'app/shared/_animations/animation';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  animations: [ fade ],
  styles: ['::ng-deep .form-dialog .mat-dialog-container {overflow: visible;}']
})
export class FormComponent implements OnInit {

  employees = [];
  scrollIndex = 1;
  hasServerError = false;
  hasClearingEmployer = false;
  message: string;
  minDateFrom = '';
  maxDateTo = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private depositsReportService: DepositsReportService,
              private dialogRef: MatDialogRef<FormComponent>,
              private departmentService: DepartmentService,
              protected notificationService: NotificationService,
              private helpers: HelpersService) { }

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees(val?: string): void {
    this.departmentService.getEmployees(this.data.departmentId, val, this.scrollIndex)
      .then(response => {
        if (!val) {
          this.employees = [...this.employees, ...response];
        } else {
          this.employees = response;
        }
      });
  }

  checkLoadEmployees(scrollY: number): void {
    if (scrollY >= 3700 * this.scrollIndex) {
      this.scrollIndex++;
      this.loadEmployees();
    }
  }

  valueDateChange(keyCode: Date, val: string): void {
    const date = formatDate(keyCode, 'yyyy-MM-dd', 'en-US', '+0530').toString();
    if (val === 'dateFrom') {
      this.minDateFrom =  date;
    } else {
      this.maxDateTo =   date;
    }
  }

  submit(form: NgForm): void {
    if (form.valid) {
      this.helpers.setPageSpinner(true);
      this.hasServerError = false;
      form.value['validity_date'] =  formatDate(form.value['dateFrom'], 'yyyy-MM-dd', 'en-US', '+0530').toString();
      form.value['validity_date_to'] =  formatDate(form.value['dateTo'], 'yyyy-MM-dd', 'en-US', '+0530').toString();
      this.depositsReportService.newDepositsReport(form.value).then(response => {
        this.helpers.setPageSpinner(false);
        if (response.ok) { this.dialogRef.close(true); }else {
          this.hasServerError = true;
          this.message = response['error']['message'];
       }});
    }
  }

  filter(event: any, name: string) {
    if (name === 'employee') {
      this.scrollIndex = 1;
      this.loadEmployees(event);
    }
  }
}
