import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'not-found-container',
  template: `
    <div class="container">
      <h1>404</h1>
      <h3>Уучлаарай таны хандсан хуудас олдсонгүй.</h3>
    </div>
  `,
  styleUrls: ['./not-found-container.component.scss']
})
export class NotFoundContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
