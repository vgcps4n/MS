import { TestBed } from '@angular/core/testing';

import { HeaderSandboxService } from './header-sandbox.service';

describe('HeaderSandboxService', () => {
  let service: HeaderSandboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderSandboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
