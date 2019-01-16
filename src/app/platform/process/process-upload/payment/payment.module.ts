import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FileDropModule } from 'ngx-file-drop';


import { DatePickerModule } from 'app/shared/app-date-picker/app-date-picker.module';
import { PipesModule } from 'app/shared/_pipes/pipes.module';
import { BdSelectModule } from 'app/../assets/js/bd-select/bd-select.module';

import { EmailComponent } from './email/email.component';
import { SendFileEmailComponent } from './send-file-email/send-file-email.component';

import { MatAutocompleteModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatFormFieldModule, MatIconModule,
         MatInputModule, MatSelectModule, MatProgressBarModule, MatMenuModule} from '@angular/material';
import { UpdatePaymentTypeComponent } from '../shared/detailed-files/update-payment-type/update-payment-type.component';
import { AttachReferenceComponent } from '../shared/detailed-files/attach-reference/attach-reference.component';
import { UpdateAccountNumberComponent } from '../shared/detailed-files/update-account-number/update-account-number.component';
import { PaymentComponent } from './payment.component';
import { UpdatePaymentDateComponent } from '../shared/detailed-files/update-payment-date/update-payment-date.component';
import { DetailedRecordsComponent } from '../shared/detailed-records/detailed-records.component';
import { DetailedFilesModule } from '../shared/detailed-files/detailed-files.module';
import { GroupTransferComponent } from '../shared/detailed-records/group-transfer/group-transfer.component';


import { ProcessService } from 'app/shared/_services/http/process.service';
import { NotificationService } from 'app/shared/_services/notification.service';


const routes: Routes = [
  { path: '', component: PaymentComponent }

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    FileDropModule,

    MatFormFieldModule, MatInputModule, MatDialogModule, MatCheckboxModule, MatSelectModule,
    MatChipsModule, MatIconModule, MatAutocompleteModule, MatProgressBarModule, MatMenuModule,
    BdSelectModule,
    PipesModule,
    DatePickerModule,
    DetailedFilesModule
  ],
  providers: [DatePipe, ProcessService, NotificationService],
  declarations: [PaymentComponent, EmailComponent, SendFileEmailComponent,
                 DetailedRecordsComponent, UpdatePaymentTypeComponent, AttachReferenceComponent,
                 UpdateAccountNumberComponent, UpdatePaymentDateComponent, GroupTransferComponent
  ],
  entryComponents: [ EmailComponent, SendFileEmailComponent, UpdatePaymentTypeComponent, AttachReferenceComponent,
    UpdateAccountNumberComponent, UpdatePaymentDateComponent, GroupTransferComponent]
})
export class PaymentModule {

}

