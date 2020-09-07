import { Injectable } from '@angular/core';
import {RegistrationService} from "./service/registration.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegistrationSandboxService {

  constructor(private rs: RegistrationService) { }

  public getResource(): Observable<any> {
    return this.rs.getResource();
  }

}
