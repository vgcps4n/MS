import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient, @Inject('baseUrl') private baseUrl) { }

  public getResource(): Observable<any> {
    return this.http.get('/api/resource');
  }

}
