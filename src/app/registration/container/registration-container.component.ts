import { Component, OnInit } from '@angular/core';
import {RegistrationSandboxService} from "../registration-sandbox.service";
import {AppService} from "../../app.service";
import {MenuItem, PATIENT_TABLE_COLUMNS, PatientModel} from "../model/registration.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {RegistrationDialogComponent} from "../component/registration-dialog/registration-dialog.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

@Component({
  selector: 'registration-container',
  template: `
    <div class="action-container">
<!--      <mat-form-field appearance="outline" [formGroup]="formGroup">-->
<!--        <mat-label>Хайх</mat-label>-->
<!--        <input matInput formControlName="search">-->
<!--        <mat-icon matSuffix>search</mat-icon>-->
<!--      </mat-form-field>-->

      <h2 class="header">Бүртгэл</h2>
      <button class="add-button" mat-mini-fab color="primary" aria-label="Create" (click)="openCreateDialog()">
        <mat-icon>add_circle</mat-icon>
      </button>
      <mat-form-field appearance="outline" class="interval">
        <mat-label>Interval</mat-label>
        <mat-date-range-input [formGroup]="formGroup" [rangePicker]="picker">
          <input matStartDate formControlName="start" placeholder="Эхлэх" readonly>
          <input matEndDate formControlName="end" placeholder="Дуусах" readonly>
        </mat-date-range-input>
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-date-range-picker #picker></mat-date-range-picker>
      </mat-form-field>
    </div>
    <ms-table [dataSource]="dataSource"
              [columns]="columns"
              [displayedColumns]="displayedColumns"
              [menuItems]="menuItems"
              [length]="length"
              (menuClick)="actionHandler($event)"
              (pageChange)="setPage($event)">
    </ms-table>
    <loading [load]="loading"></loading>
  `,
  styleUrls: ['./registration-container.component.scss']
})
export class RegistrationContainerComponent implements OnInit {

  patients: PatientModel[];
  dataSource: MatTableDataSource<PatientModel>;
  columns = PATIENT_TABLE_COLUMNS;
  displayedColumns: string[] = ['registerNumber', 'firstName', 'lastName', 'age', 'gender', 'sisiId', 'phoneNumber'];
  menuItems: MenuItem[] = [
    { id: 'edit', name: 'Өөрчлөх', icon: 'create' },
    { id: 'examine', name: 'Үзлэг хийх', icon: 'accessibility' },
    { id: 'exams', name: 'Үзлэг харах', icon: 'visibility' },
  ];

  length: number;
  pageIndex = 0;
  pageSize = 10;

  formGroup: FormGroup;

  loading = false;

  constructor(
    private sb: RegistrationSandboxService,
    private app: AppService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {
    const now = new Date();
    this.formGroup = fb.group({
      search: [''],
      start: [new Date(now.getFullYear(), now.getMonth(), 1)],
      end: [new Date(now.getFullYear(), now.getMonth() + 1, 0)],
    });

    sb.getPatientsLength().subscribe(res => this.length = res);

    this.formGroup.controls['end'].valueChanges.pipe(
      debounceTime(400), distinctUntilChanged()
    ).subscribe(value => {
      if (value) {
        this.updateTable();
      }
    });
  }

  ngOnInit(): void {
    this.updateTable();
  }

  updateTable(): void {
    this.loading = true;
    this.sb.getPatients(
      this.pageIndex, this.pageSize,
      this.formGroup.controls['start'].value,
      this.formGroup.controls['end'].value
    ).subscribe(res => {
      this.loading = false;
      this.patients = res;
      this.dataSource = new MatTableDataSource<PatientModel>(this.patients);
    }, () => this.loading = false);
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(RegistrationDialogComponent, {
      width: '500px',
      disableClose: true,
      data: {
        title: 'ӨВЧТӨН БҮРТГЭХ',
        submit: 'ҮҮСГЭХ',
        cancel: 'ЦУЦЛАХ'
      },
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loading = true;
        this.sb.createPatient(res).subscribe((res: PatientModel) => {
          this.loading = false;
          this.patients.unshift(res);
          this.dataSource = new MatTableDataSource<PatientModel>(this.patients);
        }, () => this.loading = false);
      }
    });
  }

  actionHandler(value) {
    const { row, item } = value;
    switch (item.id) {
      case 'examine':
        this.router.navigateByUrl(`/examination?patientId=${row.id}&open=true`).then(r => console.log(r));
        break;
      case 'exams':
        this.router.navigateByUrl(`/examination?patientId=${row.id}`).then(r => console.log(r));
    }
  }

  setPage(page) {
    this.pageIndex = page.pageIndex;
    this.pageSize = page.pageSize;
    this.updateTable();
  }
}
