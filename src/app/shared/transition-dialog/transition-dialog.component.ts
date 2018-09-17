import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Contact } from "../_models/contact.model";
import { ContactService } from "../_services/http/contact.service";
import { ContactFormComponent } from "../../secure/settings/contacts/contact-form/contact-form.component";
import { ProcessFileService } from "../_services/http/process-file.service";

@Component({
  selector: 'app-transition-dialog',
  templateUrl: './transition-dialog.component.html',
  styleUrls: ['./transition-dialog.component.css']
})
export class TransitionDialogComponent implements OnInit {

  constructor(private router: Router, private dialogRef: MatDialogRef<TransitionDialogComponent>, private processFileService: ProcessFileService,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private contactService: ContactService, ) { }

  ngOnInit() {
    if (this.data.Contact.length > 0) {
      setTimeout(() => {
        this.dialogRef.close();
        this.router.navigate(['/dashboard']);
      }, 4500);
    }
    else {

    }
  }
  openFormDialog(item: Contact): void {
    const contact = item ? item : new Contact;
   contact.entityType=0;
   contact.entityTypeId = this.data.process.employer.id;
    const dialogRef = this.dialog.open(ContactFormComponent, {
      width: '800px',
      data: {
        contact: contact
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contactService.storeContact(result)
          .then(response => {
            if (response['id']) {
              this.processFileService.PrepareContactToSendMail(this.data.process.id, this.data.isPaymentTransferred).then((response) => {
                this.data.Contact = response;
              });
            }
          });
      }
    });
  }
}
