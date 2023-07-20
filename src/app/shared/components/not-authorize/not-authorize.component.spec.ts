import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAuthorizeComponent } from './not-authorize.component';

describe('NotAuthorizeComponent', () => {
  let component: NotAuthorizeComponent;
  let fixture: ComponentFixture<NotAuthorizeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotAuthorizeComponent]
    });
    fixture = TestBed.createComponent(NotAuthorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
