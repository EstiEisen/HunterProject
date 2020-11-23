import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DatePipe } from '@angular/common';
import { InvoiceService } from '../../../shared/_services/http/invoice.service';

@Component({
  selector: 'app-new-employers-form',
  templateUrl: './new-employers-form.component.html',
  styleUrls: ['./new-employers-form.component.css', '../../../shared/data-table/data-table.component.css']
})
export class NewEmployersFormComponent implements OnInit {
  @ViewChild(DataTableComponent) dataTable: DataTableComponent;

  readonly columns  = [
    { name: 'name', label: 'שם מעסיק'},
    { name: 'identifier', label: 'ח.פ. מעסיק'},
    { name: 'total_amount', label: ' סכום'},
  ];
  dataFilters = {};
  constructor(private dialogRef: MatDialogRef<NewEmployersFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private datepipe: DatePipe,
              private InvoiceService: InvoiceService) { }

  ngOnInit() {
    if (this.data['from_date']) {
      this.dataFilters['from_date'] = this.datepipe.transform(this.data['from_date'], 'yyyy-MM-dd');
      this.dataFilters['to_date'] = this.datepipe.transform(this.data['to_date'], 'yyyy-MM-dd');
    } else {
      this.dataFilters['month'] = this.datepipe.transform(this.data['month'], 'yyyy-MM-dd');
    }
    if (this.data['project_id'] !== '0') {
      this.dataFilters['project_id'] = this.data['project_id'];
    }
    if (this.data['product_type'] !== 'all') {
      this.dataFilters['product_type'] = this.data['product_type'];
    }
    this.fetchItems();
  }

  fetchItems(): void {
    if (this.dataTable) {
      this.dataTable.criteria.filters = this.dataFilters;
      this.dataTable.criteria.limit = 8;
      console.log(this.dataTable);
      this.InvoiceService.getNewEmployersIncomes(this.dataTable.criteria)
        .then(response => {
          this.dataTable.setItems(response); });
    }
}


}
