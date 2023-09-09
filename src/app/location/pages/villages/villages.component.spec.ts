import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillagesComponent } from './villages.component';

describe('VillagesComponent', () => {
  let component: VillagesComponent;
  let fixture: ComponentFixture<VillagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VillagesComponent]
    });
    fixture = TestBed.createComponent(VillagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
