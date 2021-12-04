import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular';
import { RatingInputComponent } from 'src/app/util/rating-input/rating-input.component';
import { RatingComponent } from 'src/app/util/rating/rating.component';

import { LeaveAReviewComponent } from './leave-a-review.component';

describe('LeaveAReviewComponent', () => {
  let component: LeaveAReviewComponent;
  let fixture: ComponentFixture<LeaveAReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule, BaloiseDesignSystemModule],
      declarations: [ LeaveAReviewComponent, RatingInputComponent, RatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveAReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
