import { TestBed } from '@angular/core/testing';

import { GlobalDataContextService } from './global-data-context.service';

describe('GlobalDataContextService', () => {
  let service: GlobalDataContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalDataContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
