import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatCheckboxModule,
  MatMenuModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDialogModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatDatepickerModule, MatAutocompleteModule, MatChipsModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { BdSelectModule } from 'app/../assets/js/bd-select/bd-select.module';

import { DetailedRecordsComponent } from './detailed-records.component';
import { DataTableModule } from 'app/shared/data-table/data-table.module';
import { NotificationService } from 'app/shared/_services/notification.service';
import { ContactService } from 'app/shared/_services/http/contact.service';
import { SendEmailIncorrectComponent } from './send-email-incorrect/send-email-incorrect.component';
import {FileDropModule} from 'ngx-file-drop';
import {PipesModule} from '../../../../../shared/_pipes/pipes.module';
import {DatePickerModule} from '../../../../../shared/app-date-picker/app-date-picker.module';

const route: Routes = [
  { path: '', component: DetailedRecordsComponent}
  ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(route),
    FileDropModule,
    MatFormFieldModule, MatInputModule, MatDialogModule, MatCheckboxModule, MatSelectModule,
    MatChipsModule, MatIconModule, MatAutocompleteModule, MatProgressBarModule, MatMenuModule,
    BdSelectModule,
    PipesModule,
    DataTableModule,
    DatePickerModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDatepickerModule
  ],
  providers: [ NotificationService, ContactService],
  declarations: [DetailedRecordsComponent, SendEmailIncorrectComponent],
})
export class DetailedRecordsModule { }
