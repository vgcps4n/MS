import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Greeting} from "./registration/model/registration.model";

@Component({
  selector: 'app-root',
  template: `
    <header-container>
      <router-outlet></router-outlet>
    </header-container>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  greeting: Greeting;
  constructor(private http: HttpClient) {
    http.get('resource').subscribe((data: Greeting) => this.greeting = data);
  }
}
