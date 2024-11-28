import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmenityComponent } from './amenity.component';

describe('AmenityComponent', () => {
  let component: AmenityComponent;
  let fixture: ComponentFixture<AmenityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmenityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmenityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
