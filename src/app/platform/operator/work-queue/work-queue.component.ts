import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-queue',
  templateUrl: './work-queue.component.html',
  styleUrls: ['./work-queue.component.css']
})
export class WorkQueueComponent implements OnInit {


  headers = [
    {label: 'משימות מערכת', link: 'system-tasks'},
    {label: 'שיחת טלפון', link: 'phone-call'},
    {label: 'מיילים',   link: 'emails'},
    {label: 'תפעול שוטף', link: 'ongoing-operation'},
    {label: 'הדרכה', link: 'guidance'},
    {label: 'הפסקה', link: 'interruption'}
  ];

  constructor() { }

  ngOnInit() {
  }

}