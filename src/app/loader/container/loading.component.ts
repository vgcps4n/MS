import {Component, Input, OnInit} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";

@Component({
  selector: 'loading',
  template: `
    <spinner [color]="color"
             [mode]="mode"
             [value]="value"
             [backdropEnabled]="true"
             [positionGloballyCenter]="true"
             [displaySpinner]="load">
    </spinner>
  `,
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  @Input() load;

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  constructor() { }

}
