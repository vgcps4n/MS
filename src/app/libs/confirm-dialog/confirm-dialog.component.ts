import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface ConfirmDialogData {
  title: string;
  content: string;
  submit: string;
  cancel?: string;
}

@Component({
  selector: 'confirm-dialog',
  template: `
    <h1 mat-dialog-title>{{data.title}}</h1>
    <mat-dialog-content>{{data.content}}</mat-dialog-content>

    <mat-dialog-actions>
        <button mat-button *ngIf="data.cancel" [mat-dialog-close]="false">{{data.cancel}}</button>
        <button mat-button [mat-dialog-close]="true">{{data.submit}}</button>
    </mat-dialog-actions>
  `,
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) { }

}

