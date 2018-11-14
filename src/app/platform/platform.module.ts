import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { BdSelectModule } from 'app/../assets/js/bd-select/bd-select.module';
import { PlatformComponent } from './platform.component';

import { IsAuthenticatedGuard } from '../shared/_guards/is-authenticated.guard';

import { OrganizationService } from 'app/shared/_services/http/organization.service';

const routes: Routes = [
  {
    path: '', component: PlatformComponent, canActivate: [IsAuthenticatedGuard], children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      // { path: 'compensations', loadChildren: 'app/platform/compensation/process/process.module#ProcessModule' },
      { path: 'compensations/process', loadChildren: 'app/platform/compensation/process/process.module#ProcessModule' },
      { path: 'compensations/dashboard', loadChildren: 'app/platform/compensation/dashboard/dashboard.module#DashboardModule' },
      { path: 'settings/contacts', loadChildren: 'app/platform/settings/contacts/contacts.module#ContactsModule' },
      { path: 'settings/employers', loadChildren: 'app/platform/settings/employers/employers.module#EmployersModule' },
      { path: 'settings/users', loadChildren: 'app/platform/settings/users/users.module#UsersModule' },
      { path: 'settings/organizations', loadChildren: 'app/platform/settings/organizations/organizations.module#OrganizationsModule' },
      { path: 'process/new', loadChildren: 'app/platform/process/process-upload/process-upload.module#ProcessUploadModule' },
      { path: 'process/table', loadChildren: 'app/platform/process/process-table/process-table.module#ProcessTableModule' },
      { path: 'finance/invoices', loadChildren: 'app/platform/finance/invoices/invoices.module#InvoicesModule' },
      { path: 'finance/errors', loadChildren: 'app/platform/finance/invoices-error/invoices-error.module#InvoicesErrorModule'}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BdSelectModule,
    RouterModule.forChild(routes),
    MatMenuModule,
  ],
  declarations: [PlatformComponent],
  providers: [IsAuthenticatedGuard, OrganizationService]
})
export class PlatformModule {}
