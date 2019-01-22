import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import {UserSessionService} from '../user-session.service';
import {HttpClient} from '@angular/common/http';
import {MonthlyTransferBlock} from '../../_models/monthly-transfer-block';
import {Employee} from '../../_models/employee.model';

@Injectable()
export class MonthlyTransferBlockService  extends BaseHttpService {
  readonly endPoint = this.apiUrl + '/mtb';

  constructor(userSession: UserSessionService, private http: HttpClient) {
    super(userSession);
  }

  groupList( processId: number): Promise<any> {
    return this.http.get(this.endPoint + '/' + processId + '/groupList', this.getTokenHeader())
      .toPromise()
      .then(response => response)
      .catch(() => null);

  }

  getMonthlyList(searchCriteria: object): Promise<MonthlyTransferBlock[]> {
    const options = this.getTokenHeader();
    options['params'] = searchCriteria;
    return this.http.get(this.endPoint, options)
      .toPromise()
      .then(response => response as MonthlyTransferBlock[])
      .catch(response => null);

  }

  // updateMTBGroup(rowIDs: number[], groupId: number): Promise<boolean> {
  //   return this.http.post(this.endPoint + '/updateMTBGroup', {ids: rowIDs, groupId: groupId}, this.getTokenHeader())
  //     .toPromise()
  //     .then(response => response)
  //     .catch(response => response);
  // }

  createMTBGroup(rowIDs: number[], bankAccountId?: number, groupId?: number, process_id?: number): Promise<boolean> {
    return this.http.post(this.endPoint + '/createOrUpdateMTBGroup',
      {ids: rowIDs, bank_account_id: bankAccountId, groupId: groupId, process_id: process_id }, this.getTokenHeader())
      .toPromise()
      .then(response => response)
      .catch(response => response);
  }

  update(type: string , val: any, Id: object): Promise<boolean> {
    return this.http.post(this.endPoint + '/Update', { params: val , type: type, Id: Id}, this.getTokenHeader())
      .toPromise()
      .then(response => response)
      .catch(response => response);
  }

  getEntity(processId: number): Promise<Employee[]> {

    const options = this.getTokenHeader();
    options['params'] = {processId : processId};
    return this.http.get(this.endPoint + '/entity', options)
      .toPromise()
      .then(response => response as Employee[])
      .catch(response => null);
  }











}
