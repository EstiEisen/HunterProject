import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';

import { MonthlyTransferBlockService } from 'app/shared/_services/http/monthly-transfer-block';
import { DataTableComponent } from 'app/shared/data-table/data-table.component';
import { ActivatedRoute } from '@angular/router';
import { DataTableHeader } from 'app/shared/data-table/classes/data-table-header';
import {NotificationService} from '../../../../../../shared/_services/notification.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-group-bank-account',
  templateUrl: './group-bank-account.component.html',
  styleUrls: ['../../../../../../shared/data-table/data-table.component.css'],
  animations: [
    trigger('fade', [
      state('inactive', style({
        display: 'none',
        height: '0'
      })),
      state('active', style({
        display: '*',
        height: '*'
      })),
      transition('active => inactive', animate('200ms')),
      transition('inactive => active', animate('200ms'))
    ])
  ]
})
export class GroupBankAccountComponent extends DataTableComponent implements OnInit , OnDestroy {

  readonly headers: DataTableHeader[] =  [
    { column: 'bank', label: 'בנק' }, { column: 'branch', label: 'סניף' },
    { column: 'account', label: 'מס חשבון' }
   ];

  constructor(protected route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<GroupBankAccountComponent>,
              public mtbService: MonthlyTransferBlockService) {
    super(route);
  }

  hasServerError: boolean;

  ngOnInit() {
    this.setItems(this.data['banks']);
  }

  submit(form: NgForm): void {
    if (this.checkedRowItems()) {
      this.mtbService.createMTBGroup(this.data.ids,  this.checkedItems.map(item => item.id)[0]).then(response => {
        if (response) {
          this.dialogRef.close();
        }
      });
    }
  }

  checkedRowItems(): boolean {
    if (this.checkedItems.length === 0 || this.checkedItems.length > 1) {
     this.hasServerError = true;
      return false;
    }
    return true;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
