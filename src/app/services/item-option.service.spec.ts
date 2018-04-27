import { TestBed, inject } from '@angular/core/testing';

import { ItemOptionService } from './item-option.service';

describe('ItemOptionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemOptionService]
    });
  });

  it('should be created', inject([ItemOptionService], (service: ItemOptionService) => {
    expect(service).toBeTruthy();
  }));
});
