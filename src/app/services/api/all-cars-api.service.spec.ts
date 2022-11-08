import { TestBed } from '@angular/core/testing';

import { AllCarsApiService } from './all-cars-api.service';

describe('AllCarsApiServiceService', () => {
  let service: AllCarsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllCarsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
