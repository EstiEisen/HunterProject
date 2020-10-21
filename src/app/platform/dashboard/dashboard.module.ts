import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { BdSelectModule } from '../../../assets/js/bd-select/bd-select.module';
import { GeneralService } from '../../shared/_services/http/general.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {DatePickerModule} from '../../shared/app-date-picker/app-date-picker.module';
import {PipesModule} from '../../shared/_pipes/pipes.module';

const routes: Routes = [
  { path: '', component: DashboardComponent }
  ];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BdSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    DatePickerModule,
    MatInputModule,
    PipesModule,
    ReactiveFormsModule,

  ],
  providers: [GeneralService]
})
export class DashboardModule { }
