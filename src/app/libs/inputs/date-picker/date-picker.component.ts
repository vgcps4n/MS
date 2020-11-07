import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'date-picker',
  template: `
    <mat-form-field appearance="outline" [formGroup]="formGroup">
      <mat-label>{{label}}</mat-label>
      <input matInput
             [formControlName]="formControlName"
             [matDatepicker]="picker"
             (dateChange)="change($event)"
             [required]="required">
      <mat-datepicker-toggle matSuffix [for]="picker">
      </mat-datepicker-toggle>
      <mat-datepicker #picker
                      [startView]="startView"
                      [startAt]="startAt">
      </mat-datepicker>
    </mat-form-field>
  `,
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() label: string;
  @Input() formControlName: string;
  @Input() required: boolean;
  @Input() startView: 'month' | 'year' | 'multi-year';
  @Input() startAt: Date;
  @Output() onChange = new EventEmitter();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  change(event) {
    this.onChange.emit(event.value);
  }
}
