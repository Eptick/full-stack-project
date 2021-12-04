import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingComponent } from 'src/app/util/rating/rating.component';

import { RestaurantReviewComponent } from './restaurant-review.component';

describe('RestaurantReviewComponent', () => {
  let component: RestaurantReviewComponent;
  let fixture: ComponentFixture<RestaurantReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantReviewComponent, RatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
