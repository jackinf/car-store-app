import { TestBed } from '@angular/core/testing';

import { BuyerService } from './buyer.service';

describe('BuyerServiceService', () => {
  let service: BuyerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
