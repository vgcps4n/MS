import { TestBed } from '@angular/core/testing';

import { LoginSandboxService } from './login-sandbox.service';

describe('LoginSandboxService', () => {
  let service: LoginSandboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginSandboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
