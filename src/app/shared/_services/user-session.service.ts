import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { User } from '../_models/user.model';

@Injectable()
export class UserSessionService {

	isLoggedInSubject: Subject<boolean> = new Subject;

	
	logout(): void {
		this.isLoggedInSubject.next(false);
		sessionStorage.removeItem('userToken');
	}



  getToken(): string {
    if (sessionStorage.getItem('userToken')) {
      return sessionStorage.getItem('userToken');
    }

    return '';
  }
}