import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { UserSessionService } from '../user-session.service';

@Injectable()
export abstract class BaseHttpService {


  
 //
readonly apiUrl =  'https://api.p88.co.il//';
//readonly apiUrl =  'http://212.150.186.197//';
//readonly apiUrl =  'http://212.29.236.113//';//prod

	constructor(protected userSession?: UserSessionService) {}
 
  getTokenHeader(): { headers: HttpHeaders } {
    const headers = this.getHeadersUser();
    return { headers: headers };
  }

  getBlobOptions(): { headers: HttpHeaders, responseType: 'blob' } {
    return {
      headers:this.getHeadersUser(),
      responseType: 'blob'
    };
  }
    getBlobOptionstext(): { headers: HttpHeaders, responseType: 'blob',observe: 'response'} {
    return {
      headers: this.getHeadersUser(),
      responseType: 'blob',
      observe:'response',
    };
  }
getHeadersUser(): HttpHeaders {
  //debugger;

  let Token= 'Bearer' + this.userSession.getToken();
  console.log('Token',Token);
  
    const headers = new HttpHeaders({
      'Authorization': Token});
    //debugger;
    return  headers; 
  }
}
