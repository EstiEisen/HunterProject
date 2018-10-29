import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';

import { EmployerService } from 'app/shared/_services/http/employer.service';
import { UserService } from 'app/shared/_services/http/user.service';
import { CompensationService } from 'app/shared/_services/http/compensation.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private employerService: EmployerService, private  userService: UserService,
              private compensationService: CompensationService) {}

  isSearching: boolean;
  employers = [];
  users = [];
  sourceType = [{id: 'safebox', name: 'כספת'}, {id: 'email', name: 'מייל'}];
  searchCriteria = {};

  response_time = {};
  request = {};
  request_company = {};
  objectKeys = Object.keys;
  date: Date;

  ngOnInit() {
    this.employerService.getEmployers().then(response => this.employers = response);
    this.userService.getUsers().then(response => this.users = response);
    this.getDefaultDate();
    this.fetchItems();
  }

  getDefaultDate(): void {
    this.date = new Date();
    this.date.setMonth(this.date.getMonth() - 1 );
    this.searchCriteria['dateTo'] = formatDate(new Date() , 'yyyy-MM-dd', 'en-US', '+0530').toString() ;
    this.searchCriteria['dateFrom'] = formatDate(this.date, 'yyyy-MM-dd', 'en-US', '+0530').toString() ;
  }


  fetchItems(): void {
    this.compensationService.getFollow(this.searchCriteria).then(response => {
      this.response_time = response['response_time'];
      this.request = response['request'];
      this.request_company = response['request_company'];

    });
  }

  valueDateChange(keyCode: Date, val: string): void {
   this.searchCriteria[val] =
     formatDate(keyCode, 'yyyy-MM-dd', 'en-US', '+0530').toString();
    this.search();
  }

  resetSearch(): void {
    this.searchCriteria = {};
    this.getDefaultDate();
    this.search();
  }

  isSearchActive(): boolean {
    return Object.keys(this.searchCriteria).length > 0;
  }

  setItems(): void {
    this.isSearching = false;
  }

  search(keyCode?: number): void {
    if (keyCode && keyCode !== 13) {
      return;
    }

    this.isSearching = true;
    setTimeout(() => this.fetchItems(), 1000);
  }
}
