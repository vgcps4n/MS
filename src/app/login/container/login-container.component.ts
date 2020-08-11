import { Component, OnInit } from '@angular/core';
import {LoginSandboxService} from "../login-sandbox.service";

@Component({
  selector: 'login-container',
  template: `
    <mat-card>

    </mat-card>
  `,
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent implements OnInit {

  constructor(private sb: LoginSandboxService) {
    sb.authenticate(undefined, undefined);
  }

  ngOnInit(): void {

  }

  logout(): void {

  }
}
