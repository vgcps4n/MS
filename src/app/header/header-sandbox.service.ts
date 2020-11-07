import { Injectable } from '@angular/core';
import {HeaderService} from "./service/header.service";
import {Observable} from "rxjs";
import {AppService} from "../app.service";
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class HeaderSandboxService {

  constructor(private hs: HeaderService) { }

  public logout(): Observable<any> {
    return this.hs.logout();
  }

  public isAuthenticated(): boolean {
    return this.hs.isAuthenticated();
  }
}
