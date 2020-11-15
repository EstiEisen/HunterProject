import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from './base-http.service';
import { UserSessionService } from './user-session.service';
import { EmployerFinancialDetails } from '../../_models/employer-financial-details.model';
import { DataTableCriteria } from '../../data-table/classes/data-table-criteria';
import { DataTableResponse } from '../../data-table/classes/data-table-response';

@Injectable({
  providedIn: 'root'
})
export class EmployerService extends BaseHttpService {

  readonly endPoint = this.apiUrl + '/employers';
  constructor(userSession: UserSessionService, private http: HttpClient) {
    super(userSession);
}

  getEmployers(): Promise<any> {
    return this.http.get(this.endPoint + '/employer_list',this.getTokenHeader())
      .toPromise()
      .then(response => response as any)
      .catch(() => null);
  }

  getEmployerExternalByEmployerId(employer_id: number): Promise<number>{
    return this.http.get(this.endPoint + '/getEmployerExternalByEmployerId?employer_id=' + employer_id, this.getTokenHeader())
      .toPromise()
      .then(response => response as any)
      .catch(() => null);
  }

  getAllEmployers(criteria?: DataTableCriteria, noLimit?: boolean): Promise<DataTableResponse> {
    const request = this.getTokenHeader();
    if (criteria) {
      request['params'] = this.setDataTableParams(criteria);
    }

    if (noLimit) {
      request['params'] = {no_limit : noLimit};
    }
    return this.http.get(this.endPoint, request)
      .toPromise()
      .then(response => response as DataTableResponse)
      .catch(() => null);
  }

  getEmployerFinance(id: number): Promise<any> {
    return this.http.get(this.endPoint + '/employerFinance?employer_id=' + id, this.getTokenHeader())
      .toPromise()
      .then(response => response as any)
      .catch(() => null);
  }
  saveFinancialDetails(employerId: number, financialDetails: EmployerFinancialDetails): Promise<boolean> {
    return this.http.post(this.endPoint + '/saveFinanceDetails',
      {financialDetails: financialDetails, employerId: employerId}, this.getTokenHeader())
      .toPromise()
      .then(response =>  response as boolean);
  }
  getEmployer(employerId: number): Promise<any> {
    return this.http.get(this.endPoint + '/getEmployer?id=' + employerId, this.getTokenHeader())
      .toPromise()
      .then(response => response as any)
      .catch(() => null);
  }

  getEmployersWithEstPayment(criteria?: DataTableCriteria, noLimit?: boolean): Promise<DataTableResponse> {
    const request = this.getTokenHeader();
    if (criteria) {
      request['params'] = this.setDataTableParams(criteria);
    }

    if (noLimit) {
      request['params'] = {no_limit : noLimit};
    }
    return this.http.get(this.endPoint + '/getEmployersWithEstPayment', request)
      .toPromise()
      .then(response => response as DataTableResponse)
      .catch(() => null);
  }

  getEmployersByPayment(criteria?: DataTableCriteria, noLimit?: boolean): Promise<DataTableResponse> {
    const request = this.getTokenHeader();
    if (criteria) {
      request['params'] = this.setDataTableParams(criteria);
    }

    if (noLimit) {
      request['params'] = {no_limit : noLimit};
    }
    return this.http.get(this.endPoint + '/getEmployersByPayment', request)
      .toPromise()
      .then(response => response as DataTableResponse)
      .catch(() => null);
  }

  getEmployersPayedByOther(criteria?: DataTableCriteria, noLimit?: boolean): Promise<DataTableResponse> {
    const request = this.getTokenHeader();
    if (criteria) {
      request['params'] = this.setDataTableParams(criteria);
    }

    if (noLimit) {
      request['params'] = {no_limit : noLimit};
    }
    return this.http.get(this.endPoint + '/getEmployersPayedByOther', request)
      .toPromise()
      .then(response => response as DataTableResponse)
      .catch(() => null);
  }

  getEmployersDashboard(data: object): Promise<any> {
    return this.http.post(this.endPoint + '/employersDashboard',
      {data: data}, this.getTokenHeader())
      .toPromise()
      .then(response => response);
  }

}
