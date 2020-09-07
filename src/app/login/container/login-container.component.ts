import { Component, OnInit } from '@angular/core';
import {LoginSandboxService} from "../login-sandbox.service";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'login-container',
  template: `
    <form class="login-form" [formGroup]="loginForm" (ngSubmit)="login()">
      <mat-card class="card">
          <mat-form-field>
            <mat-label>
              Username
            </mat-label>
            <input matInput formControlName="username" required>
          </mat-form-field>
          <mat-form-field>
            <mat-label>
              Password
            </mat-label>
            <input matInput type="password" formControlName="password" required>
          </mat-form-field>
          <button mat-button type="submit">Login</button>
      </mat-card>
    </form>
  `,
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private sb: LoginSandboxService, fb: FormBuilder) {
    this.loginForm = fb.group({
      username: [''],
      password: [''],
    });
  }

  ngOnInit(): void {

  }

  login(): boolean {
    this.sb.authenticate(this.loginForm.value);
    return false;
  }
}
