import { TestBed } from '@angular/core/testing';

import { HealthAmenitiesService } from './health-amenities.service';

describe('HealthAmenitiesService', () => {
  let service: HealthAmenitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthAmenitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
