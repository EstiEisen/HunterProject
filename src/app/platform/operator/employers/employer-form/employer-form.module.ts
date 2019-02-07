import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployerFormComponent } from './employer-form.component';
import {RouterModule, Routes} from '@angular/router';
import {EmployersResolve} from '../../../../shared/_resolves/employers.resolve';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatOptionModule,
  MatSelectModule
} from '@angular/material';
import {BdSelectModule} from '../../../../../assets/js/bd-select/bd-select.module';
import {EmployerService} from '../../../../shared/_services/http/employer.service';
import {GeneralHttpService} from '../../../../shared/_services/http/general-http.service';


const routes: Routes = [
  { path: '', component: EmployerFormComponent , children: [
      { path: 'comments', loadChildren: './comments/comments.module#CommentsModule' },
      { path: 'documents', loadChildren: './documents/documents.module#DocumentsModule' },
      { path: 'contacts', loadChildren: './contacts/contacts.module#ContactsModule' },
      { path: 'departments', loadChildren: './departments/departments.module#DepartmentsModule' },
      { path: 'defrayal', loadChildren: './defrayal/defrayal.module#DefrayalModule' },
      { path: 'finance', loadChildren: './finance/finance.module#FinanceModule' },
      { path: 'tasks', loadChildren: './tasks/tasks.module#TasksModule' },
      { path: 'reports', loadChildren: './reports/reports.module#ReportsModule' }
    ]}
  ];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatCheckboxModule, MatRadioModule, MatSelectModule, MatButtonModule, MatIconModule,
    BdSelectModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule
  ],
  declarations: [EmployerFormComponent],
  providers: [EmployerService, EmployersResolve, GeneralHttpService]

})
export class EmployerFormModule { }
