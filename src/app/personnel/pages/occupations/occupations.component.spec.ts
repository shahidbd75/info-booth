import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationsComponent } from './occupations.component';

describe('OccupationsComponent', () => {
  let component: OccupationsComponent;
  let fixture: ComponentFixture<OccupationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OccupationsComponent],
    });
    fixture = TestBed.createComponent(OccupationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
