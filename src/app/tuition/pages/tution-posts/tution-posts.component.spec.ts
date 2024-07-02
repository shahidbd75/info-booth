import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutionPostsComponent } from './tution-posts.component';

describe('TutionPostsComponent', () => {
  let component: TutionPostsComponent;
  let fixture: ComponentFixture<TutionPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TutionPostsComponent]
    });
    fixture = TestBed.createComponent(TutionPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
