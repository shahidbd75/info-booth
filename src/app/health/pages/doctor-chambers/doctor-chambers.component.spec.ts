import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorChambersComponent } from './doctor-chambers.component';

describe('DoctorChambersComponent', () => {
  let component: DoctorChambersComponent;
  let fixture: ComponentFixture<DoctorChambersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorChambersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorChambersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
