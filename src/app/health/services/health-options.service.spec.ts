import { TestBed } from '@angular/core/testing';

import { HealthOptionsService } from './health-options.service';

describe('HealthOptionsService', () => {
  let service: HealthOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
