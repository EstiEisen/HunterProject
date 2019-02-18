import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { animate, state, style, transition, trigger} from '@angular/animations';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-skip-task',
  templateUrl: './skip-task.component.html',
  animations: [
    trigger('fade', [
      state('inactive', style({
        display: 'block',
        opacity: '0'
      })),
      state('active', style({
        display: 'block',
        opacity: '1'
      })),
      transition('active => inactive', animate('300ms ease-in')),
      transition('inactive => active', animate('300ms ease-in'))
    ])
  ]})
export class SkipTaskComponent implements OnInit {
  hasServerError: boolean;

  constructor(public dialogRef: MatDialogRef<SkipTaskComponent>) { }

  ngOnInit() {
  }
  submit(form: NgForm): void {
    this.hasServerError = false;
    if (form.valid) {
      const aaa = form.value;
    }
  }
}
