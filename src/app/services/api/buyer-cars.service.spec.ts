import { TestBed } from '@angular/core/testing';

import { BuyerCarsApiService } from './buyer-cars-api.service';

describe('BuyerCarsServiceService', () => {
  let service: BuyerCarsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyerCarsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
