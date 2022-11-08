import { TestBed } from '@angular/core/testing';

import { BuyerCarsService } from './buyer-cars.service';

describe('BuyerCarsServiceService', () => {
  let service: BuyerCarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyerCarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
