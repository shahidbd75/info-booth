import { TestBed } from '@angular/core/testing';

import { DoctorChambersClientService } from './doctor-chambers-client.service';

describe('DoctorChambersClientService', () => {
  let service: DoctorChambersClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorChambersClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
