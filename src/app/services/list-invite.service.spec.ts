import { TestBed, inject } from '@angular/core/testing';

import { ListInviteService } from './list-invite.service';

describe('ListInviteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListInviteService]
    });
  });

  it('should be created', inject([ListInviteService], (service: ListInviteService) => {
    expect(service).toBeTruthy();
  }));
});
