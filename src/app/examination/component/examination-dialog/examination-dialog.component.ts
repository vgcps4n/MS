import {Component, Inject, OnInit, Output, EventEmitter, OnChanges, Input, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ExaminationDialogData} from "../../model/examinaiton.model";

@Component({
  selector: 'examination-dialog',
  template: `
    <h3>{{data.title}}</h3>
    <mat-dialog-content [formGroup]="formGroup">
      <mat-form-field appearance="outline" class="full">
        <mat-label>Регистрийн дугаар</mat-label>
        <input matInput
               formControlName="patientRegisterNumber"
               required
               autofocus
               (input)="filterRegisters()"
               [matAutocomplete]="autocomplete">
        <mat-autocomplete #autocomplete="matAutocomplete">
          <mat-option *ngFor="let register of filteredRegisters" [value]="register">{{register}}</mat-option>
        </mat-autocomplete>
        <mat-error>Заавал оруулна уу</mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full">
        <mat-label>Онош</mat-label>
        <input matInput
               formControlName="symptom"
               required>
        <mat-error>Заавал оруулна уу</mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full">
        <mat-label>Биеийн байдал</mat-label>
        <input matInput formControlName="physicalState">
      </mat-form-field>

      <mat-form-field appearance="outline" class="third">
        <mat-label>Биеийн температур</mat-label>
        <input matInput formControlName="temperature" type="number">
        <mat-error>Температур буруу байна.</mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline" class="third">
        <mat-label>Артерын даралт</mat-label>
        <input matInput formControlName="bloodPressure" type="number">
        <mat-error>Даралт буруу байна.</mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline" class="third">
        <mat-label>Зүрхний цохилтын тоо</mat-label>
        <input matInput formControlName="heartRate" type="number">
        <mat-error>Зүрхний цохилт буруу байна.</mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full">
        <mat-label>Арьс салстын байдал</mat-label>
        <input matInput formControlName="skinCondition">
      </mat-form-field>

      <mat-form-field appearance="outline" class="full">
        <mat-label>Цээжний эрхтэн тогтолцоо /амьсгал/</mat-label>
        <input matInput formControlName="thoracic">
      </mat-form-field>

      <mat-form-field appearance="outline" class="full">
        <mat-label>Бусад /захын тунгалгын зангилаа г.м/</mat-label>
        <input matInput formControlName="other">
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions class="actions">
      <button mat-button *ngIf="data.cancel" [mat-dialog-close]="false">{{data.cancel}}</button>
      <button mat-button
              [mat-dialog-close]="formGroup.value"
              [disabled]="formGroup.invalid || !isValid()">{{data.submit}}</button>
    </mat-dialog-actions>
  `,
  styleUrls: ['./examination-dialog.component.scss']
})
export class ExaminationDialogComponent implements OnChanges {

  formGroup: FormGroup;
  allRegisters: string[];
  filteredRegisters: string[];
  @Input() registerNumber;

  constructor(
    private dialogRef: MatDialogRef<ExaminationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExaminationDialogData,
    private fb: FormBuilder
  ) {
    this.allRegisters = data.registers;
    this.filteredRegisters = this.allRegisters;
    this.formGroup = fb.group({
      patientRegisterNumber: [data.patient ? data.patient.registerNumber : ''],
      symptom: [''],
      physicalState: [''],
      temperature: ['', [Validators.min(34), Validators.max(45)]],
      bloodPressure: ['', [Validators.min(0)]],
      heartRate: ['', [Validators.min(0), Validators.max(300)]],
      skinCondition: [''],
      thoracic: [''],
      other: [''],
    });
  }

  ngOnChanges(changes:SimpleChanges): void {
    if (changes.registerNumber && changes.registerNumber.currentValue) {
      this.formGroup.controls['patientRegisterNumber'].setValue(this.registerNumber);
    }
  }

  filterRegisters() {
    const filter = this.formGroup.controls['patientRegisterNumber'].value.toUpperCase();
    this.filteredRegisters = this.allRegisters ? this.allRegisters.filter(register => register.toUpperCase().includes(filter)) : null;
  }

  isValid(): boolean {
    return this.formGroup.controls['patientRegisterNumber'].value !== '' && this.allRegisters &&
      this.allRegisters.indexOf(this.formGroup.controls['patientRegisterNumber'].value) !== -1;
  }
}
