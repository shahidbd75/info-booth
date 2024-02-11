import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { professionalCvBasicResolver } from './professional-cv-basic.resolver';

describe('professionalCvBasicResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => professionalCvBasicResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
