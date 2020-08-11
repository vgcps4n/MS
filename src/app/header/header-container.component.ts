import { Component, OnInit } from '@angular/core';

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
          <a mat-button [routerLink]="['/']">test</a>
          <a mat-button (click)="logout()" >Гарах</a>
        </div>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
  styleUrls: ['./header-container.component.scss']
})
export class HeaderContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  logout(): void {
    console.log("logged out.");
  }
}
