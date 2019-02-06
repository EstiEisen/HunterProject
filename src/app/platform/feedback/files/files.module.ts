import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesComponent } from './files.component';
import { NotificationService } from 'app/shared/_services/notification.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { DataTableModule } from 'app/shared/data-table/data-table.module';
import {
  MatAutocompleteModule,
  MatCheckboxModule, MatChipsModule, MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatNativeDateModule,
  MatOptionModule,
  MatSelectModule,
  MatTooltipModule
} from '@angular/material';
import { FormComponent } from './form/form.component';
import { FeedbackService } from 'app/shared/_services/http/feedback.service';
import { BdSelectModule } from '../../../../assets/js/bd-select/bd-select.module';
import { ContactService } from 'app/shared/_services/http/contact.service';
import { HelpersService } from 'app/shared/_services/helpers.service';
import { GeneralHttpService } from 'app/shared/_services/http/general-http.service';
import { CommentsFormComponent } from '../shared/comments-form/comments-form.component';

const routes: Routes = [
  { path: '', component: FilesComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    DataTableModule,
    MatInputModule, MatTooltipModule, MatDialogModule, MatFormFieldModule,
    MatSelectModule, MatOptionModule, MatCheckboxModule, MatFormFieldModule,
    MatChipsModule, MatIconModule, MatAutocompleteModule,
    BdSelectModule, MatDatepickerModule, MatNativeDateModule
  ],
  declarations: [FilesComponent, FormComponent],
  providers: [NotificationService, FeedbackService, ContactService, HelpersService, GeneralHttpService],
  entryComponents: [FormComponent]
})
export class FilesModule { }