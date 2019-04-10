// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { DataTableComponent } from 'app/shared/data-table/data-table.component';
// import { ActivatedRoute } from '@angular/router';
// import { formatDate } from '@angular/common';
// import { MatDialog } from '@angular/material';
// import { Subscription} from 'rxjs';
//
// import { EmployersFinanceExcelComponent} from './employers-finance-excel/employers-finance-excel.component';
// import { ProactiveInvoiceFormComponent} from './proactive-invoice-form/proactive-invoice-form.component';
// import { INVOICE_TYPES, STATUS, ALL_STATUS} from 'app/shared/_models/invoice.model';
// import { SelectUnitService} from 'app/shared/_services/select-unit.service';
// import { RemarksFormComponent} from './remarks-form/remarks-form.component';
// import { InvoiceService} from 'app/shared/_services/http/invoice.service';
// import { HelpersService} from 'app/shared/_services/helpers.service';
//
// @Component({
//   selector: 'app-invoices',
//   templateUrl: './invoices.component.html',
//   styleUrls: ['../../../shared/data-table/data-table.component.css', './invoices.component.css']
// })
// export class InvoicesComponent implements OnInit, OnDestroy {
//   employers = [];
//   departments = [];
//   invoices = [];
//   invoice_status = STATUS;
//   selectStatus = Object.keys(ALL_STATUS).map(function(e) {
//     return { id: e, name: ALL_STATUS[e] };
//   });
//   invoice_all_status = ALL_STATUS;
//   sub = new Subscription;
//
//   readonly columns  = [
//     { name: 'employer_name', label: 'שם מעסיק' },
//     { name: 'green_invoice_number', label: 'מספר חשבונית בירוקה' },
//     { name: 'amount', label: 'סכום' },
//     { name: 'amount_ids', label: 'כמות ת"ז' },
//     { name: 'for_month', label: 'בגין חודש' },
//     { name: 'created_at', label: 'ת.יצירה' },
//     { name: 'last_payment_date', label: 'לתשלום עד' },
//     { name: 'kind', label: 'סוג חשבונית' },
//     { name: 'status',  label: 'סטטוס', searchOptions: { labels: this.invoice_status } },
//     { name: 'remark', label: 'הערות' },
//     { name: 'options', label: 'אפשרויות' }
//   ];
//
//   constructor(route: ActivatedRoute,
//               private invoiceService: InvoiceService,
//               private selectUnit: SelectUnitService,
//               private helpers: HelpersService,
//               private dialog: MatDialog) {
//   }
//
//   ngOnInit() {
//     this.fetchItems();
//   }
//
//   fetchItems() {
//       this.invoiceService.getInvoices(this.searchCriteria).then(response => {
//           this.setItems(response) ;
//         });
//       }
//
//   valueDateChange(keyCode: Date): void {
//     this.searchCriteria['request_created_at'] =
//       formatDate(keyCode, 'yyyy-MM-dd', 'en-US', '+0530').toString();
//     this.search();
//   }
//
//   valueDateChange2(keyCode: Date): void {
//     this.searchCriteria['for_month'] =
//       formatDate(keyCode, 'yyyy-MM-dd', 'en-US', '+0530').toString();
//     this.search();
//   }
//
//   ShowRemarks(item: Object): void {
//     this.dialog.open(RemarksFormComponent, {
//       data: item,
//       width: '750px'
//     });
//   }
//   openProactiveInvoice(): void {
//     this.dialog.open(ProactiveInvoiceFormComponent, {
//       width: '450px'
//     });
//   }
//
//   openFinanceExcelDialog(): void {
//     this.dialog.open(EmployersFinanceExcelComponent, {
//       width: '450px',
//       panelClass: 'employers-finance-excel'
//     });
//   }
//   ngOnDestroy() {
//     super.ngOnDestroy();
//     this.sub.unsubscribe();
//   }
// }
