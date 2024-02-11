import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonSelectorComponent } from './person-selector.component';

describe('PersonSelectorComponent', () => {
  let component: PersonSelectorComponent;
  let fixture: ComponentFixture<PersonSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonSelectorComponent],
    });
    fixture = TestBed.createComponent(PersonSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
