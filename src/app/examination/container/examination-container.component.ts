import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ExaminationSandboxService} from "../examination-sandbox.service";
import {MatTableDataSource} from "@angular/material/table";
import {ExamModel} from "../model/examinaiton.model";
import {EXAM_TABLE_COLUMNS} from "../model/examination.constant";
import {Observable} from "rxjs";
import {ExaminationDialogComponent} from "../component/examination-dialog/examination-dialog.component";
import {PatientModel} from "../../registration/model/registration.model";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {LoadingComponent} from "../../loader/container/loading.component";

@Component({
  selector: 'examination-container',
  template: `
    <div class="action-container">
      <!--      <mat-form-field appearance="outline" [formGroup]="formGroup">-->
      <!--        <mat-label>Хайх</mat-label>-->
      <!--        <input matInput formControlName="search">-->
      <!--        <mat-icon matSuffix>search</mat-icon>-->
      <!--      </mat-form-field>-->
      <h2 class="header">Үзлэг <span *ngIf="patient">/{{patient.firstName + '-' + patient.registerNumber}}/</span></h2>
      <button mat-mini-fab color="primary" aria-label="Create" (click)="openCreateDialog()" class="add-button">
        <mat-icon>add_circle</mat-icon>
      </button>
      <mat-form-field appearance="outline" class="interval" *ngIf="!patient">
        <mat-label>Interval</mat-label>
        <mat-date-range-input [formGroup]="formGroup" [rangePicker]="picker">
          <input matStartDate
                 formControlName="start"
                 placeholder="Эхлэх"
                 readonly>
          <input matEndDate
                 formControlName="end"
                 placeholder="Дуусах"
                 readonly>
        </mat-date-range-input>
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-date-range-picker #picker></mat-date-range-picker>
      </mat-form-field>
    </div>
    <ms-table #examTable
              [dataSource]="dataSource"
              [columns]="columns"
              [displayedColumns]="filteredColumns" (pageChange)="setPage($event)">
    </ms-table>
    <loading [load]="loading"></loading>
  `,
  styleUrls: ['./examination-container.component.scss']
})
export class ExaminationContainerComponent implements OnInit {

  patientId: string;
  patient: PatientModel;
  allRegisterNumbers: string[];
  exams: ExamModel[];
  dataSource: MatTableDataSource<ExamModel>;
  columns = EXAM_TABLE_COLUMNS;
  displayedColumns: string[] = ['patientRegisterNumber', 'symptom', 'physicalState', 'examinedDate'];
  filteredColumns: string[];

  formGroup: FormGroup;
  @ViewChild('examTable') examTable;
  loading = false;

  observable: Observable<ExamModel[]>;

  pageIndex: number = 0;
  pageSize: number = 10;

  constructor(
    private sb: ExaminationSandboxService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    const now = new Date();
    this.formGroup = fb.group({
      search: [''],
      start: [new Date(now.getFullYear(), now.getMonth(), 1)],
      end: [new Date(now.getFullYear(), now.getMonth() + 1, 0)],
    });
    this.formGroup.controls['end'].valueChanges.pipe(
      debounceTime(400), distinctUntilChanged()
    ).subscribe(value => {
      if (value) {
        this.updateTable();
      }
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.route.queryParams.subscribe(params => {
      this.patientId = params['patientId'];
      this.getUpdatedObservable().subscribe(res => {
        this.exams = res;
        this.dataSource = new MatTableDataSource<ExamModel>(this.exams);
        this.loading = true;
        this.sb.getAllRegisters().subscribe(registers => {
          this.allRegisterNumbers = registers;
          if (this.patientId) {
            this.loading = true;
            this.sb.getPatientById(this.patientId).subscribe(res => {
              this.loading = false;
              this.patient = res;
              if (params['open']) {
                this.openCreateDialog();
              }
              this.filteredColumns = this.displayedColumns.filter(column => column !== 'patientRegisterNumber');
            });
          } else {
            this.filteredColumns = this.displayedColumns;
            this.patient = null;
            this.loading = false;
          }
        });
      });
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(ExaminationDialogComponent, {
      width: '500px',
      disableClose: true,
      data: {
        title: 'ҮЗЛЭГ ҮҮСГЭХ',
        patient: this.patient ? this.patient : null,
        registers: this.allRegisterNumbers,
        submit: 'ҮҮСГЭХ',
        cancel: 'ЦУЦЛАХ',
      },
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe((exam: ExamModel) => {
      if (exam) {
        this.loading = true;
        this.sb.getPatientByRegisterNumber(exam.patientRegisterNumber).subscribe(res => {
          exam.patientId = res.id;
          this.sb.createExam(exam).subscribe((id: string) => {
            this.sb.getExamById(id).subscribe((res: ExamModel) => {
              this.loading = false;
              this.exams.unshift(res);
              this.dataSource = new MatTableDataSource<ExamModel>(this.exams);
            }, () => this.loading = false);
          }, () => this.loading = false);
        }, () => this.loading = false);
      }
    });
  }

  updateTable(): void {
    this.loading = true;
    this.getUpdatedObservable().subscribe(res => {
      this.loading = false;
      this.exams = res;
      this.dataSource = new MatTableDataSource<ExamModel>(this.exams);
    }, () => this.loading = false);
  }

  setPage(page) {
    this.pageIndex = page.pageIndex;
    this.pageSize = page.pageSize;
  }

  getUpdatedObservable(): Observable<ExamModel[]> {
    if (this.patientId) {
      return this.sb.getExamsByPatientId(this.patientId);
    } else {
      return this.sb.getExams(
        this.pageIndex ? this.pageIndex : 0, this.pageSize ? this.pageSize : 10,
        this.formGroup.controls['start'].value,
        this.formGroup.controls['end'].value
      );
    }
  }
}
