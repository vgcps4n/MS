import { Injectable } from '@angular/core';
import {LoginService} from "./service/login.service";

@Injectable({
  providedIn: 'root'
})
export class LoginSandboxService {

  constructor(private ls: LoginService) { }

  public authenticate(username: string, password: string): void {
    console.log("[sb] authenticating...");
    this.ls.authenticate(username, password);
  }
}
