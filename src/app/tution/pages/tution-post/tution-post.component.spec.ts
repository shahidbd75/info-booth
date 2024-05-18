import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutionPostComponent } from './tution-post.component';

describe('TutionPostComponent', () => {
  let component: TutionPostComponent;
  let fixture: ComponentFixture<TutionPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TutionPostComponent]
    });
    fixture = TestBed.createComponent(TutionPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
