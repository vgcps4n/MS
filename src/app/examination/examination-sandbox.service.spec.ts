import { TestBed } from '@angular/core/testing';

import { ExaminationSandboxService } from './examination-sandbox.service';

describe('ExaminationSandboxService', () => {
  let service: ExaminationSandboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExaminationSandboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
