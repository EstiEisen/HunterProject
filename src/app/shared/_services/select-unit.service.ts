import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class SelectUnitService {

  currentProjectGroupId: number;
  currentEmployerID: any;
  currentOrganizationID: number;
  unitSubject: Subject<number> = new Subject();
  activeUrl: string;

  setActiveUrl(activeUrl: any): void {
    sessionStorage.setItem('activeUrl', JSON.stringify(activeUrl));
     this.unitSubject.next(activeUrl);
  }

  getActiveUrl(): any {
    return this.getSessionStorage('activeUrl');
  }

  setActiveEmployerUrl(activeEmployerUrl: any): void {
    sessionStorage.setItem('activeEmployerUrl', JSON.stringify(activeEmployerUrl));
    // this.unitSubject.next(activeEmployerUrl);
  }

  getActiveEmployerUrl(): any {
    return this.getSessionStorage('activeEmployerUrl');
  }

  setProjectGroupId(projectGroupId: any): void {
    sessionStorage.setItem('projectGroupId', JSON.stringify(projectGroupId));
    this.currentProjectGroupId = projectGroupId;
    this.unitSubject.next(projectGroupId);
  }

  getProjectGroupId(): any {
    return this.getSessionStorage('projectGroupId');
  }


  getEmployerID(): any {
    return this.getSessionStorage('employerID');
  }

  setEmployerID(employerId: any): any {
    sessionStorage.setItem('employerID', JSON.stringify(employerId));
    this.currentEmployerID = employerId;
    this.unitSubject.next(employerId);
  }

  getOrganizationID(): any {
    return this.getSessionStorage('organizationID');
  }

  setOrganizationID(organizationID: number): any {
    sessionStorage.setItem('organizationID', organizationID.toString());
    this.currentOrganizationID = organizationID;
    this.unitSubject.next(organizationID);
  }
  getSessionStorage(val: string): any {
    if (sessionStorage.getItem(val)) {
      return JSON.parse(sessionStorage.getItem(val));
    }
    return 0;
  }
}








