import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsTableComponent } from './ms-table.component';

describe('MsTableComponent', () => {
  let component: MsTableComponent;
  let fixture: ComponentFixture<MsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
