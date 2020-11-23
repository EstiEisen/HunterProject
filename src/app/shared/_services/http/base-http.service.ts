import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../app/../environments/environment';
import { UserSessionService } from './user-session.service';
import { DataTableCriteria } from '../../data-table/classes/data-table-criteria';

@Injectable()
export class BaseHttpService {

  readonly apiUrl = environment.apiUrl;

  constructor(protected userSession?: UserSessionService) {}

  getTokenHeader(): { headers: HttpHeaders } {
    return { headers: this.getTokenHeaders() };
  }

  getTokenHeaders(): HttpHeaders {
    return new HttpHeaders({ 'token': this.userSession.getToken() });
  }

  setDataTableParams(criteria: DataTableCriteria, params?: Object): Object {
    const formattedParams = { ...criteria.filters, ...criteria.sort, ...params };

    if (criteria.keyword) {
      formattedParams['keyword'] = criteria.keyword;
    }

    if (criteria.isCheckAll) {
      formattedParams['isCheckAll'] = criteria.isCheckAll;
    }

    if (criteria.page) {
      formattedParams['page'] = criteria.page;
    }

    if (criteria.limit) {
      formattedParams['limit'] = criteria.limit;
    }

    return formattedParams;
  }
}
