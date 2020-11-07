import { Injectable } from '@angular/core';
import {AppService} from "../../app.service";
import {Observable} from "rxjs";
import {AuthService} from "../../auth.service";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private authService: AuthService) { }

  public logout(): Observable<any> {
    return this.authService.logout();
  }

  public isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
