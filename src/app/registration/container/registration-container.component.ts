import { Component, OnInit } from '@angular/core';
import {Greeting} from "../model/registration.model";
import {RegistrationSandboxService} from "../registration-sandbox.service";
import {AppService} from "../../app.service";

@Component({
  selector: 'app-registration-container',
  template: `
    <div style="text-align:center" [hidden]="!authenticated()" *ngIf="greeting">
      <h1>Welcome {{title}}!</h1>
      <div>
        <p>Id: <span>{{greeting.id}}</span></p>
        <p>Message: <span>{{greeting.content}}!</span></p>
      </div>
    </div>
    <div [hidden]="authenticated()">
      <p>Login to see your greeting</p>
    </div>
  `,
  styleUrls: ['./registration-container.component.scss']
})
export class RegistrationContainerComponent implements OnInit {

  title: string;
  greeting: Greeting;

  constructor(private sb: RegistrationSandboxService, private app: AppService) { }

  ngOnInit(): void {
    this.sb.getResource().subscribe(res => console.log(res));
  }

  authenticated(): boolean {
    return this.app.isAuthenticated();
  }
}
