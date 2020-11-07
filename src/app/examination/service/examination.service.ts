import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ExamModel} from "../model/examinaiton.model";
import {Observable} from "rxjs";
import {catchError, flatMap, map} from "rxjs/operators";
import {PatientModel} from "../../registration/model/registration.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {

  SNACKBAR_CREATED = 'Үзлэг амжилттай үүслээ.';
  SNACKBAR_CREATED_ERR = 'Үзлэг үүсгэхэд алдаа гарлаа.';

  SNACKBAR_DURATION = 1500;
  SNACKBAR_CLOSE = 'ХААХ';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  public createExam(exam: ExamModel): Observable<string> {
    return this.http.post('/exams', exam).pipe(map((res: any) => {
      this.snackBar.open(this.SNACKBAR_CREATED, this.SNACKBAR_CLOSE, { duration: this.SNACKBAR_DURATION});
      return res.id;
    }), catchError(err => {
      this.snackBar.open(this.SNACKBAR_CREATED_ERR, this.SNACKBAR_CLOSE, { duration: this.SNACKBAR_DURATION});
      throw err;
    }));
  }

  public getExamsByPatientId(patientId: string): Observable<ExamModel[]> {
    return this.http.get('/exams/patient/' + patientId).pipe(map((res: any[]) => {
      return ExaminationService.mapToExamModels(res);
    }));
  }

  public getExams(page: number, size: number, startDate: Date, endDate: Date): Observable<ExamModel[]> {
    const params = new HttpParams()
      .set('page', '' + page)
      .set('size', '' + size)
      .set('startDate', startDate.toLocaleDateString())
      .set('endDate', endDate.toLocaleDateString());
    return this.http.get('/exams', {params: params}).pipe(map((res: any[]) => {
      return ExaminationService.mapToExamModels(res);
    }));
  }

  public getExamById(id: string): Observable<ExamModel> {
    return this.http.get('/exams/' + id).pipe(map((res: any) => ExaminationService.mapToExamModel(res)));
  }

  private static mapToExamModel(entity: any): ExamModel {
    return {
      id: entity.id,
      patientId: entity.patientId,
      patientRegisterNumber: entity.patientRegisterNumber,
      symptom: entity.symptom,
      physicalState: entity.physicalState,
      temperature: entity.temperature,
      bloodPressure: entity.bloodPressure,
      heartRate: entity.heartRate,
      skinCondition: entity.skinCondition,
      thoracic: entity.thoracic,
      other: entity.other,
      examinedDate: entity.examinedDate,
    }
  }

  private static mapToExamModels(entities: any[]): ExamModel[] {
    const exams = [];
    for (const entity of entities) {
      exams.push(ExaminationService.mapToExamModel(entity));
    }
    return exams;
  }
}
