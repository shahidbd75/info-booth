import { TestBed } from '@angular/core/testing';

import { ToletOptionsService } from './tolet-options.service';

describe('ToletOptionsService', () => {
  let service: ToletOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToletOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
