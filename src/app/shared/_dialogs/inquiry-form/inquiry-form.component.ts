import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatChipInputEvent, MatDialog, MatDialogRef,
        MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material';
import { FormControl, NgForm} from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable} from 'rxjs';

import { GeneralHttpService } from 'app/shared/_services/http/general-http.service';
import { ContactService } from 'app/shared/_services/http/contact.service';
import { HelpersService } from 'app/shared/_services/helpers.service';
import { fade } from 'app/shared/_animations/animation';


export interface Contact {
  id: number;
  name: string;
}
export interface Email {
  name: string;
}

@Component({
  selector: 'app-inquiry-form',
  templateUrl: './inquiry-form.component.html',
  animations: [ fade ]
})
export class InquiryFormComponent implements OnInit {
  hasServerError: boolean;
  uploadedFile: File [];
  contactsAdd: Contact[] = [];
  comments = '';
  selectable = true;
  removable = true;
  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  Emails: Email[] = [];
  contacts: Contact[] = [];

  @ViewChild('contactInput') contactInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog,
              private dialogRef: MatDialogRef<InquiryFormComponent>,
              private contactService: ContactService, private helpers: HelpersService,
              private generalService: GeneralHttpService) { }

  ngOnInit() {
    this.helpers.setPageSpinner(true);
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getEmployerContacts(this.data.companyId, this.data.employerId).then(types => {
      this.contacts = types;
      this.helpers.setPageSpinner(false);
    });
  }

  submit(form: NgForm): void {
    if (form.valid) {
      this.hasServerError = false;
      this.generalService.newInquiry(this.data.id, this.comments, this.data.contentType, this.Emails, form.value['contactsAdd'],
        this.uploadedFile).then(response => {
        if (response) {
          this.dialogRef.close(this.data);
        } else {
          this.hasServerError = true;
        }
      });
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ((value || '').trim()) {
      if (validEmailRegEx.test(value.trim())) {
        this.Emails.push({name: value.trim()});
      }
    }

    if (input && validEmailRegEx.test(value.trim())) {
      input.value = '';
    }
  }

  remove(fruit: Email): void {
    const index = this.Emails.indexOf(fruit);

    if (index >= 0) {
      this.Emails.splice(index, 1);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
