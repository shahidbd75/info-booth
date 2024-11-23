import { TestBed } from '@angular/core/testing';

import { HospitalsClientService } from './hospitals-client.service';

describe('HospitalsClientService', () => {
  let service: HospitalsClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HospitalsClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
