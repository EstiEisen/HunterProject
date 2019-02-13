import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as FileSaver from 'file-saver';

import { DataTableComponent } from 'app/shared/data-table/data-table.component';
import { SelectUnitService } from 'app/shared/_services/select-unit.service';
import { DataTableHeader } from 'app/shared/data-table/classes/data-table-header';
import { DocumentService } from 'app/shared/_services/http/document.service';
import {NotificationService} from '../../../../../shared/_services/notification.service';
import {HelpersService} from '../../../../../shared/_services/helpers.service';
import {SendFileEmailComponent} from '../../../../process/process-upload/payment/send-file-email/send-file-email.component';
import {MatDialog} from '@angular/material';
import {AddDocumentComponent} from './add-document/add-document.component';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styles: ['.row-image { width: 30px; height: auto; }' ]
})
export class DocumentsComponent extends DataTableComponent implements OnInit , OnDestroy {

  constructor(route: ActivatedRoute,
    private documentService: DocumentService,
    private selectUnit: SelectUnitService,
    protected notificationService: NotificationService,
    private dialog: MatDialog) {
    super(route, notificationService);
    this.paginationData.limit = 5;
  }

readonly headers: DataTableHeader[] =  [
    { column: 'filename', label: 'שם הקובץ' },
    { column: 'date', label: 'תאריך העלאה' },
    { column: 'type', label: 'סוג' },
  ];

  ngOnInit() {
    this.documentService.getDocuments(this.selectUnit.currentEmployerID)
      .then(response => this.setItems(response));
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  file(rowId: number, type: string): any {
    this.documentService.downloadFile(rowId).then(response => {
      if (response) {
        const byteCharacters = atob(response);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], {type: 'application/pdf'});
        const fileURL = URL.createObjectURL(blob);
        if (type === 'show') {
          window.open(fileURL);
        } else {
          FileSaver.saveAs(blob, 'Compensation-Request-Reply.pdf');
        }
      }else {
        type =  type === 'show' ?  'להציג' : 'להוריד';
        this.notificationService.error('', ' אין אפשרות ' + type +  ' קובץ ');
      }
    });
  }

  addDocument() {
    this.dialog.open(AddDocumentComponent, {
      width: '550px',
      panelClass: 'send-email-dialog'
    });
  }
}
