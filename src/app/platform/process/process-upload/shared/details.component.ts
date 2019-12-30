import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { ProcessDetails } from 'app/shared/_models/process-details.model';
import { ProcessService } from 'app/shared/_services/http/process.service';
import { SelectUnitService } from 'app/shared/_services/select-unit.service';
import { ProcessDataService } from 'app/shared/_services/process-data-service';
import { NotificationService } from 'app/shared/_services/notification.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  providers: [NotificationService],
  styles: [ '.disabled { pointer-events: none; opacity: 0.4; }' ]
})
export class DetailsComponent  implements OnInit {

  @Input()  type = 'records' || 'files';

  process_details: ProcessDetails;

  constructor(route: ActivatedRoute,
              private router: Router,
              public processDataService: ProcessDataService,
              private processService: ProcessService,
              private selectUnitService: SelectUnitService) {
  }

  ngOnInit() {
    if (this.processDataService.activeProcess === undefined) {
      this.processDataService = this.selectUnitService.getProcessData();
    }
    this.processService.getUploadFileDone(this.processDataService.activeProcess.processID).then( response =>
      this.process_details = response
    );
    const url = this.router.url.split('/');
    if (url[url.length - 1] === 'files') {
      this.type = 'files';
    } else {
      this.type = 'records';
    }
  }

  previous() {
     if ( this.router.url.includes('records/')) {
       this.type = 'records';
       return this.router.navigate(['/platform', 'process', 'new', 1, 'details', 'files']);
     }
      if (this.processDataService.activeProcess.pageNumber === 4 ||
      this.processDataService.activeProcess.pageNumber === 5) {
      this.router.navigate(['/platform', 'process', 'new', 1, 'broadcast']);
    } else {
      this.router.navigate(['/platform', 'process', 'new', 1 ,
        'payment', this.processDataService.activeProcess.processID]);
    }
  }
}
