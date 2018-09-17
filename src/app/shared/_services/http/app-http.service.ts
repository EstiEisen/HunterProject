import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { BaseHttpService } from './base-http.service';
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class AppHttpService extends BaseHttpService {
  constructor(private http: HttpClient) {
    super();
  }

   login(username: string, password: string): Promise<any> {

    var data = "username=" + username + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.apiUrl + '/token', data, { headers: reqHeader }).toPromise()
    .catch(response => console.log(response))
  }
}
