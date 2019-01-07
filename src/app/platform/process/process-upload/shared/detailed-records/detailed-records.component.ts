import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../../../shared/data-table/data-table.component';
import { ActivatedRoute } from '@angular/router';
import { DataTableHeader } from '../../../../../shared/data-table/classes/data-table-header';

@Component({
  selector: 'app-detailed-records',
  templateUrl: './detailed-records.component.html',
  styleUrls: ['./detailed-records.component.css']
})
export class DetailedRecordsComponent  extends DataTableComponent implements OnInit {

  readonly headers: DataTableHeader[] =  [
    { column: 'process_name', label: 'שם העובד' }, { column: 'process_number', label: 'תעודת זהות' },
    { column: 'type', label: 'סוג תקבול' }, { column: 'month', label: 'מספר קופה בשכר' },
    { column: 'amount', label: 'שם קןפה בשכר' }, { column: 'status', label: 'סוג קופה' },
    { column: 'download', label: 'סטטוס' }, { column: 'download', label: 'מ"ה' },
    { column: 'download', label: 'חודש תשלום' }, { column: 'download', label: 'חודש ייחוס' },
    { column: 'download', label: 'שכר' }, { column: 'download', label: 'פיצויים' },
    { column: 'download', label: 'הפרשת מעסיק' }, { column: 'download', label: 'הפרשת עובד' },
    { column: 'download', label: 'סה"כ' }
  ];

  constructor(route: ActivatedRoute ) {
    super(route);
  }

  ngOnInit() {
  }

}