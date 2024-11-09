import { TestBed } from '@angular/core/testing';

import { DoctorsClientService } from './doctors-client.service';

describe('DoctorsClientService', () => {
  let service: DoctorsClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorsClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
