import { TestBed } from '@angular/core/testing';

import { VillageService } from './village.service';

describe('VillageService', () => {
  let service: VillageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VillageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
