import { Injectable } from '@angular/core';
import {ExaminationService} from "./service/examination.service";
import {ExamModel} from "./model/examinaiton.model";
import {Observable} from "rxjs";
import {PatientModel} from "../registration/model/registration.model";
import {RegistrationService} from "../registration/service/registration.service";

@Injectable({
  providedIn: 'root'
})
export class ExaminationSandboxService {

  constructor(private es: ExaminationService, private rs: RegistrationService) { }

  public createExam(exam: ExamModel): Observable<string> {
    return this.es.createExam(exam);
  }

  public getExamsByPatientId(patientId: string): Observable<ExamModel[]> {
    return this.es.getExamsByPatientId(patientId);
  }

  public getExams(page: number, size: number, startDate: Date, endDate: Date): Observable<ExamModel[]> {
    return this.es.getExams(page, size, startDate, endDate);
  }

  public getAllRegisters(): Observable<string[]> {
    return this.rs.getAllRegisters();
  }

  public getPatientById(patientId: string): Observable<PatientModel> {
    return this.rs.getPatientById(patientId);
  }

  public getPatientByRegisterNumber(registerNumber: string): Observable<PatientModel> {
    return this.rs.getPatientByRegisterNumber(registerNumber);
  }

  public getExamById(id: string): Observable<ExamModel> {
    return this.es.getExamById(id);
  }
}
