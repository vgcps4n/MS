import { Injectable } from '@angular/core';
import {AppService} from "../../app.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private app: AppService) { }

  public logout(): Observable<any> {
    return this.app.logout();
  }
}
