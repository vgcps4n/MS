import { Injectable } from '@angular/core';
import {HeaderService} from "./service/header.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeaderSandboxService {

  constructor(private hs: HeaderService) { }

  public logout(): Observable<any> {
    return this.hs.logout();
  }
}
