import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Credentials} from "./login/model/login.model";
import {catchError, map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private authenticated = false;

  constructor(private http: HttpClient, private router: Router, @Inject('baseUrl') private baseUrl) {
    http.get('/api/token').subscribe(data => {
      const token = data['token'];
      http.get('/api', {
        headers: new HttpHeaders().set('X-Auth-Token', token)
      }).subscribe(response => console.log(response));
    }, () => {});
  }

  public authenticate(credentials: Credentials, cb) {
    const headers = new HttpHeaders(credentials ? {
      authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.http.get('/api/user', {headers: headers}).subscribe(response => {
      this.authenticated = !!response['name'];
      return cb && cb();
    });
  }

  public isAuthenticated(): boolean {
    return this.authenticated;
  }

  public logout(): Observable<any> {
    return this.http.post('logout', {}).pipe(next => {
      this.router.navigateByUrl('/login').then(value => console.log(value)).catch(err => console.log(err));
      return next;
    }, catchError(err => {
      throw new Error(err);
    }));
  }
}
