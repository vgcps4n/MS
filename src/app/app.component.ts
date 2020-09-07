import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <header-container></header-container>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
}
