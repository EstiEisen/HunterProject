import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

import { UserSessionService } from '../../shared/_services/user-session.service';
import { AppHttpService } from '../../shared/_services/http/app-http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  username: string;
  password: string;
  loginErrorMsg: string;
  loginErrors = false;

  constructor(private router: Router, private dialog: MatDialogRef<LoginComponent>,
              private userSession: UserSessionService, private appHttp: AppHttpService) {}

  makeLogin(isValid: boolean): void {
    this.loginErrors = false;
    if (isValid) {
      this.appHttp.login(this.username, this.password).then(response => this.handleLogin(response));
    }
  }

 private handleLogin(response: any): void {
    


    try{
      if (response['access_token']) {
        console.log("response.access_token",response.access_token);
      sessionStorage.setItem('userToken',response.access_token);
      this.dialog.close();
      this.router.navigate(['/dashboard']);
      }
    }
  catch(Error){
      this.loginErrors=true;
      this.loginErrorMsg = "שם משתמש וסיסמא לא נכונים !";
    }
   
 
  }
}
