import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellListComponent } from './sell-list.component';

describe('SellListComponent', () => {
  let component: SellListComponent;
  let fixture: ComponentFixture<SellListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellListComponent]
    });
    fixture = TestBed.createComponent(SellListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
