import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationComponent } from './occupation.component';

describe('OccupationComponent', () => {
  let component: OccupationComponent;
  let fixture: ComponentFixture<OccupationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OccupationComponent],
    });
    fixture = TestBed.createComponent(OccupationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
