import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EditPaymentsComponent } from './edit-payments.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditPaymentResolve } from 'app/shared/_resolves/edit-payment.resolve';
import {MonthlyTransferBlockService} from '../../../shared/_services/http/monthly-transfer-block';
import {
  MatAutocompleteModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import {BdSelectModule} from '../../../../assets/js/bd-select/bd-select.module';
import {DatePickerModule} from '../../../shared/app-date-picker/app-date-picker.module';
import {NotificationService} from '../../../shared/_services/notification.service';


const routes: Routes = [
  { path: '', component: EditPaymentsComponent },
  { path: ':id', component: EditPaymentsComponent, resolve: { mtb: EditPaymentResolve } }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    DatePickerModule,
    BdSelectModule,
  ],
  declarations: [EditPaymentsComponent],
  providers: [EditPaymentResolve, MonthlyTransferBlockService, NotificationService]
})

export class EditPaymentsModule {


}