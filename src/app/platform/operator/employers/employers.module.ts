import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DataTableModule } from 'app/shared/data-table/data-table.module';
import { MatDialogModule } from '@angular/material';

import { BdSelectModule } from '../../../../assets/js/bd-select/bd-select.module';
import { EmployersComponent } from './employers.component';
import { EmployerService } from 'app/shared/_services/http/employer.service';
import { SelectUnitService } from 'app/shared/_services/select-unit.service';

const routes: Routes = [
  { path: '', component: EmployersComponent },
  { path: 'form', loadChildren: 'app/platform/operator/employers/employer-form/employer-form.module#EmployerFormModule' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataTableModule,
    MatDialogModule,
    BdSelectModule
  ],
  declarations: [EmployersComponent],
  providers: [EmployerService, SelectUnitService]
})
export class EmployersModule { }