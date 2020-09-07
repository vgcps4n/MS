import { Component, OnInit } from '@angular/core';
import {HeaderSandboxService} from "../header-sandbox.service";

@Component({
  selector: 'header-container',
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <a mat-button [routerLink]="['/']">
          <h1>Эмнэлгийн систем</h1>
        </a>
        <span class="spacer"></span>
        <div>
          <a mat-button [routerLink]="['/login']">Бүртгэл</a>
          <a mat-button (click)="logout()" >Гарах</a>
        </div>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
  styleUrls: ['./header-container.component.scss']
})
export class HeaderContainerComponent implements OnInit {

  constructor(private sb: HeaderSandboxService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.sb.logout();
  }
}
