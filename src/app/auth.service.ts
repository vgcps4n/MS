import { Injectable } from '@angular/core';
import {Credentials} from "./login/model/login.model";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static token: string = localStorage.getItem("token");
  private static authenticated: boolean = AuthService.token !== undefined;
  constructor(private http: HttpClient, private router: Router) { }

  public static setToken(token: string) {
    localStorage.setItem("token", token);
    this.token = token;
  }

  public static getToken(): string {
    return localStorage.getItem("token");
  }

  public isAuthenticated(): boolean {
    return AuthService.authenticated;
  }

  public authenticate(credentials: Credentials, cb) {
    this.http.post('/aim/login', credentials).subscribe((response: any) => {
      AuthService.setToken(response.access_token);
      AuthService.authenticated = true;
      this.router.navigateByUrl('/').then(r => cb && cb());
    });
  }

  public logout(): Observable<any> {
    return this.http.post('logout', {}).pipe(next => {
      this.router.navigateByUrl('/login').then(value => console.log(value)).catch(err => console.log(err));
      AuthService.authenticated = false;
      return next;
    }, catchError(err => {
      throw new Error(err);
    }));
  }
}
