import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BdSelectModule } from '../../../../../assets/js/bd-select/bd-select.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule
} from '@angular/material';
import { DatePickerModule } from '../../../../shared/app-date-picker/app-date-picker.module';
import { RouterModule, Routes } from '@angular/router';
import { CommentsComponent } from './comments.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';


const routes: Routes = [
  { path: '', component: CommentsComponent }
];

@NgModule({
  declarations: [CommentsComponent],
    imports: [
        CommonModule,
        BdSelectModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule,
        MatDatepickerModule,
        DatePickerModule,
        MatCheckboxModule,
        MatDividerModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        MatSelectModule,
        MatCardModule,
    ]
})
export class CommentsModule { }
