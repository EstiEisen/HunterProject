import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule, MatInputModule, MatDialogModule,
  MatProgressBarModule, MatSelectModule, MatTooltipModule, MatProgressSpinnerModule, MatCheckboxModule } from '@angular/material';
import { ProcessService } from 'app/shared/_services/http/process.service';
import { ProcessUploadComponent } from './process-upload.component';
import { DetailedFilesComponent } from './detailed-files/detailed-files.component';
import { BroadcastProcessComponent } from './broadcast-process/broadcast-process.component';

const routes: Routes = [
  { path: '', component: ProcessUploadComponent, children: [
<<<<<<< HEAD
      { path: '', loadChildren: './payment/payment.module#PaymentModule' },
      { path: 'payment', loadChildren: './upload-file/upload-file.module#UploadFileModule' },
      { path: 'new', loadChildren: '../process-upload/process-upload.module#ProcessUplodModule' }
=======
      { path: 'payment', loadChildren: './process-data/process-data.module#ProcessDataModule' },
      { path: '', loadChildren: './payment/payment.module#PaymentModule' }
>>>>>>> 05fb9eb7f6a62f51ff2383c70eef5ae611395bb5
      // { path: 'broadcast', loadChildren: './payment/payment.module#PaymentModule' }
    ]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule, MatInputModule, MatSelectModule, MatDialogModule,
    MatProgressBarModule, MatTooltipModule, MatProgressSpinnerModule, MatCheckboxModule
  ],
  declarations: [ProcessUploadComponent, DetailedFilesComponent, BroadcastProcessComponent],
  providers: [ProcessService]
})
export class ProcessUploadModule {}
