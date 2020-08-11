import { Component, OnInit } from '@angular/core';
import {Greeting} from "../model/registration.model";

@Component({
  selector: 'app-registration-container',
  template: `
    <div style="text-align:center" [hidden]="" *ngIf="greeting">
      <h1>Welcome {{title}}!</h1>
      <div class="container">
        <p>Id: <span>{{greeting.id}}</span></p>
        <p>Message: <span>{{greeting.content}}!</span></p>
      </div>
    </div>
  `,
  styleUrls: ['./registration-container.component.scss']
})
export class RegistrationContainerComponent implements OnInit {

  title: string;
  greeting: Greeting;

  constructor() { }

  ngOnInit(): void {
  }

}
