import { TestBed, inject } from '@angular/core/testing';

import { DefaultRedirectService } from './default-redirect.service';

describe('DefaultRedirectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultRedirectService]
    });
  });

  it('should be created', inject([DefaultRedirectService], (service: DefaultRedirectService) => {
    expect(service).toBeTruthy();
  }));
});
