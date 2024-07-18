import { TestBed } from '@angular/core/testing';

import { TuitionPostService } from './tuition-post.service';

describe('TuitionPostService', () => {
  let service: TuitionPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TuitionPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
