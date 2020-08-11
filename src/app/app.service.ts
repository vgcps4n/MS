import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Credentials} from "./login/model/login.model";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  authenticated = false;

  constructor(private http: HttpClient) { }

  authenticate(credentials: Credentials, callback: Function) {
    const headers = new HttpHeaders(credentials ? {
      authorization : 'Basic' + btoa(credentials.username + ':' + credentials.password),
    } : {});

    this.http.get('user', {headers: headers}).subscribe(response => {
      this.authenticated = !!response['name'];
      return callback && callback();
    });
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }
}
