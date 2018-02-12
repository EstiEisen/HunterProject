import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { EmployerService } from '../_services/http/employer.service';

import { Employer } from '../_models/employer.model';

@Injectable()
export class EmployersResolve implements Resolve<Employer[]> {

  constructor(private employerService: EmployerService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.employerService.getEmployers();
  }
}
