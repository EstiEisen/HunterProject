import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from 'app/shared/data-table/data-table.component';
import { DataTableHeader } from 'app/shared/data-table/classes/data-table-header';
import {ActivatedRoute} from '@angular/router';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material';
import { NotificationService } from 'app/shared/_services/notification.service';
import {InvoiceService} from '../../../shared/_services/http/invoice.service';
import {ProactiveInvoiceFormComponent} from './proactive-invoice-form/proactive-invoice-form.component';
import {INVOICE_TYPES, STATUS, ALL_STATUS} from '../../../shared/_models/invoice.model';


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['../../../shared/data-table/data-table.component.css', './invoices.component.css']
})
export class InvoicesComponent extends DataTableComponent implements OnInit {
  employers = [];
  departments = [];
  invoices = [];
  invoiceTypes = INVOICE_TYPES;
  invoice_status = STATUS;
  invoice_all_status = ALL_STATUS;
  readonly statusSelectOptions = [];



  readonly headers: DataTableHeader[] =  [
    { column: 'employer_name', label: 'שם מעסיק' },
    { column: 'green_invoice_number', label: 'מספר חשבונית בירוקה' },
    { column: 'amount', label: 'סכום' },
    { column: 'amount_ids', label: 'כמות ת"ז' },
    { column: 'for_month', label: 'בגין חודש' },
    { column: 'created_at', label: 'ת.יצירה' },
    { column: 'last_payment_date', label: 'לתשלום עד' },
    { column: 'kind', label: 'סוג חשבונית' },
    { column: 'status',  label: 'סטטוס', searchOptions: { labels: this.invoice_status } },
    { column: 'options', label: 'אפשרויות' }
  ];

  constructor(route: ActivatedRoute, private invoiceService: InvoiceService,
              private dialog: MatDialog) {super(route); }

  ngOnInit() {
    this.invoiceService.getInvoices().then(response => {
      this.setItems(response);
    });
    for (const status in this.invoice_status) {
      this.statusSelectOptions.push({ value: status, label: this.invoice_status[status] });
    }
  }

  valueDateChange(keyCode: Date): void {
    this.searchCriteria['date_request'] =
      formatDate(keyCode, 'yyyy-MM-dd', 'en-US', '+0530').toString();
    this.search();
  }

  valueDateChange2(keyCode: Date): void {
    this.searchCriteria['date_request2'] =
      formatDate(keyCode, 'yyyy-MM-dd', 'en-US', '+0530').toString();
    this.search();
  }

  openProactiveInvoice(): void {
    this.dialog.open(ProactiveInvoiceFormComponent, {
      width: '450px'
    });
  }
}
