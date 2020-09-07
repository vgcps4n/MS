import { Injectable } from '@angular/core';
import {Credentials} from "./model/login.model";
import {AppService} from "../app.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginSandboxService {

  constructor(private app: AppService) { }

  public authenticate(credentials: Credentials): void {
    this.app.authenticate(credentials, () => console.log('authenticated.'));
  }
}
