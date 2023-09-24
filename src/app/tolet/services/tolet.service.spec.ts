import { TestBed } from '@angular/core/testing';

import { ToletService } from './tolet.service';

describe('ToletService', () => {
  let service: ToletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
