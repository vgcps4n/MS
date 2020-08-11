import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {Error} from "tslint/lib/error";
import {AppService} from "../../app.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private app: AppService, private http: HttpClient, private router: Router) { }

  public authenticate(username: string, password: string): void {
    console.log("authenticating...");
    this.app.authenticate({username: username, password: password}, () => {
      console.log("authenticated.");
    });
  }

  public logout(): Observable<any> {
    return this.http.post('logout', {}).pipe(next => {
      console.log(next);
      this.router.navigateByUrl('/login').then()
      return next;
    }, catchError(err => {
      console.log(err);
      throw new Error(err);
    }));
  }

}
