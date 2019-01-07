import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { SendFileEmailComponent } from './send-file-email/send-file-email.component';
// import { ProcessService } from '../../../../shared/_services/http/process.service';
import {Router} from '@angular/router';
import { ProcessService } from 'app/shared/_services/http/process.service';
import {ErrorMessageComponent} from './error-message/error-message.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {EmailComponent} from './email/email.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styles: ['.thborder { border-bottom: 2px solid #dee2e6 }' ],
  animations: [
    trigger('fade', [
      state('inactive', style({
        display: 'none',
        opacity: '0'
      })),
      state('active', style({
        display: 'block',
        opacity: '1'
      })),
      transition('active => inactive', animate('0ms ease-in')),
      transition('inactive => active', animate('300ms ease-in'))
    ])
  ]
})
export class PaymentComponent implements OnInit {
  constructor( public router: Router, private dialog: MatDialog, private  processService: ProcessService) {}

  fileId = 1;
  progress_status = '';
  progress_percent = 0;
  progress_num;
  data;
  email: string;
  name = 'someone';
  pageNumber = 1;

  ngOnInit() {


    this.processService.getUploadFile(this.fileId)
      .then( response => this.data = response);
        if (this.data != null) {
          this.progress_status = this.data['status'];
          switch (this.progress_status) {
            case 'Progressing': {
              this.progress_percent = 100;
              setTimeout(() => {
                this.divshow = 2;
              }, 2000);
              break;
            }
            case 'Loading': {
              this.progress_percent = this.data['percent'];
              break;
            }
            case 'Error_Loading': {
              this.openErrorDialog();
              break;
            }
            default: {
              break;
            }
          }
        } else {
          this.progress_percent = 100;
          setTimeout(() => {
            this.divshow = 2;
          }, 2000);
        }
  }

  openDialog(): void {
    this.processService.getEmailUser().then( response => {
      this.email = response['email'];
      this.dialog.open(EmailComponent, {
        data: this.email,
        width: '550px',
        panelClass: 'email-dialog'
      });
    });
  }


  openErrorDialog(): void {
    this.dialog.open(ErrorMessageComponent, {
      width: '550px'
      // panelClass: 'email-dialog'
    });
  }



  openDialogSendFileEmail(): void {
    this.dialog.open(SendFileEmailComponent, {
      width: '550px',
      panelClass: 'send-email-dialog'
    });
  }


  goToHomePage() {
    this.router.navigate(['platform', 'dashboard']);
  }

}