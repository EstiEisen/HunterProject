import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { CompensationService } from 'app/shared/_services/http/compensation.service';

import { Compensation } from 'app/shared/_models/compensation.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styles: ['#commentsTable { height: 200px; overflow-y: auto; padding-top: 20px }'],
  animations: [
    trigger('fade', [
      state('inactive', style({
        display: 'none',
        opacity: '0'
      })),
      state('active', style({
        display: '*',
        opacity: '1'
      })),
      transition('active => inactive', animate('0ms')),
      transition('inactive => active', animate('200ms'))
    ])
  ]
})
export class CommentsComponent implements OnInit {
  comments = [];
  comment: string;
  hasServerError: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public compensation: Compensation,
              private dialogRef: MatDialogRef<CommentsComponent>, private compensationService: CompensationService) {}

  ngOnInit() {
    this.compensationService.getComments(this.compensation.id).then(response => this.comments = response);
  }

  submit(): void {
    this.hasServerError = false;

    this.compensationService.newComment(this.compensation.id, this.comment).then(response => {
      if (response) {
        this.dialogRef.close(this.comment);
      } else {
        this.hasServerError = true;
      }
    });
  }

}