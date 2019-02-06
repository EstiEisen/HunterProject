import {Component, OnInit, Inject} from '@angular/core';
import { FeedbackService } from 'app/shared/_services/http/feedback.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {Subscription} from 'rxjs';
import * as FileSaver from 'file-saver';
import {SelectUnitService} from '../../../../shared/_services/select-unit.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  sub = new Subscription();
  fileName: string;
  spin: boolean;
  // employerId = this.selectUnit.currentEmployerID;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private feedbackService: FeedbackService,
              private dialog: MatDialog,
              private selectUnit: SelectUnitService) { }

  ngOnInit() {
    console.log(this.data);
  }

  downloadFile(id: number) {

    this.feedbackService.downloadGroupThingFile(id).then(response => {
      const fileName = response['fileName'];
      const byteCharacters = atob(response['blob']);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {type: 'application//pdf'});
      FileSaver.saveAs(blob, fileName);
      this.spin = false;
    });
  }

  // openInquiresDialog(id: number): void {
  //   const dialog = this.dialog.open(InquiryFormComponent, {
  //     data: {'id': id, 'contentType': 'groupthing', 'employerId': employerId, 'companyId': 5},
  //     width: '550px',
  //     panelClass: 'dialog-file'
  //   });
  //   this.sub.add(dialog.afterClosed().subscribe(() => {
  //     this.dialog.closeAll();
  //   }));
  // }

  // openCommentsDialog(id: number): void {
  //   const dialog = this.dialog.open(CommentsFormComponent, {
  //     data: {'id': id, 'contentType': 'groupthing'},
  //     width: '550px',
  //     panelClass: 'dialog-file'
  //   });
  //   this.sub.add(dialog.afterClosed().subscribe(() => {
  //   })
  //   );
  // }
}
