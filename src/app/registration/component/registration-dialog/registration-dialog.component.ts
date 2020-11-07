import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Gender, RegistrationDialogData} from "../../model/registration.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'registration-dialog',
  template: `
    <h3>{{data.title}}</h3>
    <mat-dialog-content [formGroup]="formGroup">
      <mat-form-field appearance="outline">
        <mat-label>Регистрийн дугаар</mat-label>
        <input matInput formControlName="registerNumber" required autofocus>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>СИСИ дугаар</mat-label>
        <input matInput formControlName="sisiId">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Нэр</mat-label>
        <input matInput formControlName="firstName" required>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Овог</mat-label>
        <input matInput formControlName="lastName" required>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Хүйс</mat-label>
        <mat-select formControlName="gender">
          <mat-option value="0">Эрэгтэй</mat-option>
          <mat-option value="1">Эмэгтэй</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Төрсөн өдөр</mat-label>
        <input matInput
               formControlName="dateOfBirth"
               [matDatepicker]="picker"
               [max]="now"
               required>
        <mat-datepicker-toggle matSuffix [for]="picker">
        </mat-datepicker-toggle>
        <mat-datepicker #picker startView="multi-year">
        </mat-datepicker>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Боловсрол</mat-label>
        <input matInput formControlName="education">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Мэргэжил</mat-label>
        <input matInput formControlName="profession">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Утасны дугаар</mat-label>
        <input matInput formControlName="phoneNumber">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Гэрийн хаяг</mat-label>
        <input matInput formControlName="homeAddress">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Ажлийн хаяг</mat-label>
        <input matInput formControlName="workAddress">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Имэйл</mat-label>
        <input matInput formControlName="email">
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions class="actions">
      <button mat-button
              *ngIf="data.cancel"
              [mat-dialog-close]="false">{{data.cancel}}</button>
      <button mat-button
              [mat-dialog-close]="formGroup.value"
              [disabled]="formGroup.invalid">{{data.submit}}</button>
    </mat-dialog-actions>
  `,
  styleUrls: ['./registration-dialog.component.scss']
})
export class RegistrationDialogComponent implements OnInit {

  formGroup: FormGroup;
  now: Date = new Date();

  constructor(
    private dialogRef: MatDialogRef<RegistrationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RegistrationDialogData,
    private fb: FormBuilder
  ) {
    this.formGroup = fb.group({
      registerNumber: ['', [Validators.required]],
      sisiId: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: [Gender.NOT_ASSIGNED],
      dateOfBirth: ['', [Validators.required, Validators.max(Date.now())]],
      education: [''],
      profession: [''],
      phoneNumber: [''],
      homeAddress: [''],
      workAddress: [''],
      email: [''],
    });
  }

  ngOnInit(): void {
  }

}
