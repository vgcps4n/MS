import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Gender, PatientModel} from "../model/registration.model";
import {flatMap, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  public createPatients(patient: PatientModel): Observable<any> {
    return this.http.post('/patients', RegistrationService.mapToCreatePatientModel(patient))
      .pipe(flatMap((res: Response) => this.http.get(res.headers.get('location'))));
  }

  public getPatients(page?: number, size?: number, startDate?: Date, endDate?: Date): Observable<PatientModel[]> {
    const params = new HttpParams()
      .set('page', '' + page)
      .set('size', '' + size)
      .set('startDate', startDate.toLocaleDateString())
      .set('endDate', endDate.toLocaleDateString());
    return this.http.get('/patients', {params}).pipe(map((res: any[]) => {
      return this.mapToPatientModels(res);
    }));
  }

  public getAllRegisters(): Observable<string[]> {
    return this.http.get('/patients/registers').pipe(map((res: string[]) => res));
  }

  public getPatientById(patientId: string): Observable<PatientModel> {
    return this.http.get('/patients/' + patientId).pipe(map((res: any) => res));
  }

  public getPatientByRegisterNumber(registerNumber: string): Observable<PatientModel> {
    return this.http.post('/patients/patient', registerNumber).pipe(map((res: any) => res));
  }

  public getPatientsLength(): Observable<number> {
    return this.http.get('/patients/count').pipe(map((res: any) => res.count));
  }

  private mapToPatientModels(entity: any[]): PatientModel[] {
    const patients: PatientModel[] = [];
    for (const patient of entity) {
      patients.push(this.mapToPatientModel(patient));
    }
    return patients;
  }

  private mapToPatientModel(entity: any): PatientModel {
    return {
      id: entity.id,
      registerNumber: entity.registerNumber,
      createdDate: entity.createdDate,
      sisiId: entity.sisiId,
      firstName: entity.firstName,
      lastName: entity.lastName,
      gender: this.toGender(entity.gender),
      dateOfBirth: entity.dateOfBirth,
      age: entity.dateOfBirth != null ? this.getAge(entity.dateOfBirth) : '',
      profession: entity.profession,
      education: entity.education,
      phoneNumber: entity.phoneNumber,
      email: entity.email,
      homeAddress: entity.homeAddress,
      workAddress: entity.workAddress,
    }
  }

  private static mapToCreatePatientModel(patient: PatientModel): any {
    return {
      registerNumber: patient.registerNumber,
      sisiId: patient.sisiId,
      firstName: patient.firstName,
      lastName: patient.lastName,
      gender: Gender[patient.gender],
      dateOfBirth: patient.dateOfBirth,
      profession: patient.profession,
      education: patient.education,
      phoneNumber: patient.phoneNumber,
      email: patient.email,
      homeAddress: patient.homeAddress,
      workAddress: patient.workAddress,
    }
  }

  toGender(gender: string): string {
    switch (Gender[gender]) {
      case 0:
        return 'ЭРЭГТЭЙ';
      case 1:
        return 'ЭМЭГТЭЙ';
      default:
        return '';
    }
  }

  getAge(dateOfBirth: string): string {
    return (new Date().getFullYear() - new Date(dateOfBirth).getFullYear()).toString();
  }
}
