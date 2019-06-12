import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import {UserSessionService} from '../user-session.service';
import {HttpClient} from '@angular/common/http';

import {Employee} from '../../_models/employee.model';
import {DataTableResponse} from '../../data-table/classes/data-table-response';
import {DataTableCriteria} from '../../data-table/classes/data-table-criteria';
import {MonthlyTransferBlock} from '../../_models/monthly-transfer-block';

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

  getMonthlyList(criteria: DataTableCriteria): Promise<DataTableResponse> {
    const options = this.getTokenHeader();
    options['params'] = this.setDataTableParams(criteria);

    return this.http.get(this.endPoint, options)
      .toPromise()
      .then(response => response as DataTableResponse)
      .catch(() => null);
  }

  createMTBGroup(ids: number[], productId: number, bankAccountId: number, groupName: string, confirmation: number,
                 type: string): Promise<any> {
    return this.http.post(this.endPoint + '/createOrUpdateMTBGroup',
      {ids: ids, bank_account_id: bankAccountId, product_id: productId,
        group_name: groupName , confirmation: confirmation, type: type}, this.getTokenHeader())
      .toPromise()
      .then(response => response)
      .catch(response => response);
  }

  update(type: string , val: any, Id: object): Promise<boolean> {
    return this.http.post(this.endPoint + '/update', { params: val , type: type, Id: Id}, this.getTokenHeader())
      .toPromise()
      .then(response => response)
      .catch(response => response);
  }

  getEntity(processId: number, record_id: number): Promise<Employee[]> {

    const options = this.getTokenHeader();
    options['params'] = {processId : processId, recordsId: record_id};
    return this.http.get(this.endPoint + '/entity', options)
      .toPromise()
      .then(response => response as Employee[])
      .catch(response => null);
  }

  getMonthly(id: number): Promise<MonthlyTransferBlock> {
    return this.http.get(this.endPoint + '/' +  id, this.getTokenHeader())
      .toPromise()
      .then(response => response as MonthlyTransferBlock)
      .catch(() => null);
  }

  setEditPayments(id: number, mtb: any): Promise<any> {
    return this.http.post(this.endPoint + '/setEditPayments/' +  id, mtb , this.getTokenHeader())
      .toPromise()
      .then(response => response)
      .catch(response => response);
  }

  markValid(ids: number[]): Promise<any> {
    return this.http.post(this.endPoint + '/markValid',
  {ids: ids}, this.getTokenHeader())
      .toPromise()
      .then(response => response)
      .catch(response => response);
  }
}
