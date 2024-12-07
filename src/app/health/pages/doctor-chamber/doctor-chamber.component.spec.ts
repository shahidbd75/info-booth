import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorChamberComponent } from './doctor-chamber.component';

describe('DoctorChamberComponent', () => {
  let component: DoctorChamberComponent;
  let fixture: ComponentFixture<DoctorChamberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorChamberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorChamberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
