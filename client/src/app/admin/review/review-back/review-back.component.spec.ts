import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewBackComponent } from './review-back.component';

describe('ReviewBackComponent', () => {
  let component: ReviewBackComponent;
  let fixture: ComponentFixture<ReviewBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewBackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
