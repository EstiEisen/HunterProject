import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { NotificationService } from 'app/shared/_services/notification.service';
import { Contact, EntityTypes, Type } from 'app/shared/_models/contact.model';
import { ProductType } from 'app/shared/_models/product.model';

import { SelectUnitService } from 'app/shared/_services/select-unit.service';
import { ProductService } from 'app/shared/_services/http/product.service';
import { ContactService } from 'app/shared/_services/http/contact.service';
import { fade } from 'app/shared/_animations/animation';
import { EmployerService } from 'app/shared/_services/http/employer.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styles: ['.operator-container {margin-right: 60px} .disabledInput { pointer-events: none; opacity: 0.4; }'],
  animations: [ fade ]
})
export class ContactFormComponent implements OnInit {

  pathEmployers = false;
  contact = new Contact();

  hasServerError: boolean;
  entities = [];
  employers = [];
  location: string;
  entityTypes = Object.keys(EntityTypes).map(function(e) {
    return { id: e, name: EntityTypes[e] };
  });
  productTypes = Object.keys(ProductType).map(function(e) {
    return { id: e, name: ProductType[e] };
  });
  planId: number;
  types = Type;
  is_warning = false;
  employerId = 0;
  organizations = [];
  disabled: boolean;
  is_update: boolean;
  type_old: string;
  changeCompany: boolean;
  contact_id: number;

  constructor( public route: ActivatedRoute,
               private selectUnit: SelectUnitService,
               private router: Router,
               private productService: ProductService,
               private contactService: ContactService,
               private employerService: EmployerService,
               protected notificationService: NotificationService,
               private _location: Location) {}

  ngOnInit() {
    this.planId = this.route.snapshot.queryParams['planId'] ? this.route.snapshot.queryParams['planId'] : null;
    this.organizations = this.selectUnit.getOrganization();
    if (this.router.url.includes( 'employers')) {
      this.pathEmployers = true;
      // this.navigate = ['platform', 'employers',
      //                  'form', this.selectUnit.currentEmployerID, 'contacts'];
      this.location = 'employers';
    } else if (this.router.url.includes( 'operator')) {
      this.location = 'operator';
      // this.navigate = ['platform', 'operator', 'contacts'];
    } else {
      // this.navigate = ['platform', 'contacts'];
      this.location = 'settings';
    }
    this.disabled = false;
    if (this.route.snapshot.data.contact) {
      this.disabled = true;
      this.is_update = true;
      this.contact = this.route.snapshot.data.contact;
      this.employerId =  this.contact.employer_id;
      this.type_old = this.contact.entity_type;
      this.contact_id = this.contact.entity_id;
    }
  }

  loadEntities(type: string): void {
    this.contact.entity_id = this.type_old !== type ? 0 : this.contact.entity_id;
    this.entities = [];
    this.type_old = type;
    if (type === 'agent') {
      this.entities = [];
    }

    if (type === 'company') {
      this.productService.getCompanies().then(response => this.entities = response);
    }

    if (type === 'employer') {
      this.contact.entity_id = this.selectUnit.currentEmployerID;
    }

    if (type === 'user') {
      if (this.selectUnit.currentEmployerID === 0) {
        this.notificationService.error( 'יש לבחור מעסיק');
      } else {
        // this.selectUnit.currentEmployerID, 'employerId', true
        this.employerService.getOperator().then(
          response => {
          this.entities = response;
        });
      }
    }
  }

  loadEmployers(organizationID: number): void {
    this.employers = this.organizations.find(o => o.id === organizationID).employer;
    this.employers.sort((a, b) => a.id - b.id);
  }

  showContact(email): void {
    if (email.valid) {
      this.contactService.getContactByEmail( email.value, this.contact.id ? this.contact.id : 0
        , this.selectUnit.currentEmployerID).then(
        response => {
          this.disabled = true;
          if (response) {
            this.is_update = true;
            this.contact = response;
          } else {
            if ( !this.is_update) {
              this.contact = new Contact();
              this.contact.email = email.value;
              if ( this.contact.types_details) {
                this.contact.types_details = Object.keys(Type).map(function(e) {
                  return { type: e, is_default: false,  exist: false, email_default: '', id_default: 0};
                });
              }
            }
          }
          this.type_old = this.contact.entity_type;
        });
    }
  }

  submit(form: NgForm, type: string): void {
    if (type === 'show') {
      if (this.selectUnit.currentEmployerID === 0) {
        this.notificationService.error( 'יש לבחור מעסיק'); }else { return this.showContact( form.controls.email); }}
    this.hasServerError = false;
    if ( this.location !== 'operator') {
      this.employerId = this.selectUnit.currentEmployerID;
    }

    if (this.contact.id && this.contact.employer_id) {
      this.employerId = this.contact.employer_id;
    }
    if (this.employerId !== 0) {
      if (form.valid) {
        if (this.is_warning) {
          const buttons = {confirmButtonText: 'כן', cancelButtonText: 'לא'};
          this.notificationService.warning('האם ברצונך לשנות את מייל ברירת המחדל?', '',
            buttons).then(confirmation => {
            if (confirmation.value) {
              this.saveContact();
            }
          });
        } else {
          this.saveContact();
        }
      }
    } else {
      this.notificationService.error( 'יש לבחור מעסיק');
    }
  }

  saveContact(): void {
      if (this.contact.id) {
        this.contact.employer_id =  this.employerId;
        this.contactService.updateContact(this.contact)
          .then(response => this.handleResponse(response));
      } else {
        this.contactService.newContact(this.contact, this.employerId)
          .then(response => this.handleResponse(response));
      }
  }

  private handleResponse(response: any): void {
    if (response.ok) {
        this._location.back();
        // this.router.navigate(this.navigate);
    } else {
      this.hasServerError = true;
    }
  }

  previous(): void {
    this._location.back();
    // if (this.router.url.includes( 'employers') && this.router.url.includes( 'contacts')) {
    //   const empId = this.selectUnit.currentEmployerID > 0 ? this.selectUnit.currentEmployerID : this.employerId;
    //   this.router.navigate(['platform', 'operator', 'employers',
    //     'form', empId, 'contacts']);
    // } else if (this.router.url.includes( 'operator')) {
    //   this.router.navigate(['/platform', 'operator', 'contacts']);
    // } else {
    //   this.router.navigate(['/platform', 'contacts']);
    //
    // }
  }

  onChangeCompany(): void {
    if (this.contact_id !== this.contact.entity_id) {
      this.changeCompany = true; }
  }
}
