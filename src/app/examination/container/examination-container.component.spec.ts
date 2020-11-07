import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationContainerComponent } from './examination-container.component';

describe('ExaminationComponent', () => {
  let component: ExaminationContainerComponent;
  let fixture: ComponentFixture<ExaminationContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaminationContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
