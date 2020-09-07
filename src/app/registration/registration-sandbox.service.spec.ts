import { TestBed } from '@angular/core/testing';

import { RegistrationSandboxService } from './registration-sandbox.service';

describe('RegistrationSandboxService', () => {
  let service: RegistrationSandboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationSandboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
