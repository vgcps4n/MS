import { Injectable } from '@angular/core';
import {RegistrationService} from "./service/registration.service";
import {Observable} from "rxjs";
import {PatientModel} from "./model/registration.model";

@Injectable({
  providedIn: 'root'
})
export class RegistrationSandboxService {

  constructor(private rs: RegistrationService) { }

  public createPatient(patient: PatientModel): Observable<any> {
    return this.rs.createPatients(patient);
  }

  public getPatients(page?: number, size?: number, startDate?: Date, endDate?: Date): Observable<any> {
    return this.rs.getPatients(page, size, startDate, endDate);
  }

  public getPatientsLength(): Observable<number> {
    return this.rs.getPatientsLength();
  }
}
