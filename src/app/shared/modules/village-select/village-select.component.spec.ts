import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillageSelectComponent } from './village-select.component';

describe('VillageSelectComponent', () => {
  let component: VillageSelectComponent;
  let fixture: ComponentFixture<VillageSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VillageSelectComponent],
    });
    fixture = TestBed.createComponent(VillageSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
