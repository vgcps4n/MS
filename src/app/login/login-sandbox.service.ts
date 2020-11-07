import { Injectable } from '@angular/core';
import {Credentials} from "./model/login.model";
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoginSandboxService {

  constructor(private authService: AuthService) { }

  public authenticate(credentials: Credentials): void {
    this.authService.authenticate(credentials, () => console.log('authenticated.'));
  }

  public isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
