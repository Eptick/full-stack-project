import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular';
import { ImageUrlPipe } from 'src/app/image-url.pipe';
import { RatingComponent } from 'src/app/util/rating/rating.component';
import { RestaurantPageComponent } from '../restaurant-page/restaurant-page.component';

import { RestaurantCardComponent } from './restaurant-card.component';

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

describe('RestaurantCardComponent', () => {
  let component: RestaurantCardComponent;
  let fixture: ComponentFixture<RestaurantCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaloiseDesignSystemModule, RouterTestingModule],
      declarations: [ RestaurantCardComponent, ImageUrlPipe, RatingComponent],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantCardComponent);
    component = fixture.componentInstance;
    component.restaurant = {"id":9,"name":"Grand","numberOfReviews":2,"averageRating":3.0,"image":15}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the restaurant name', () => {
    let heading = fixture.nativeElement.querySelector("bal-heading")
    expect(heading.textContent).toBe("Grand")
  });

  it('should display rating', () => {
    let rating = fixture.nativeElement.querySelector("app-rating")
    expect(rating).toBeTruthy();
  });

  it('should navigate to restaurant page', () => {
    let bal_card= fixture.debugElement.query(By.css('bal-card'));
    let router = fixture.debugElement.injector.get(Router);
    let registerSpy = spyOn(router , 'navigateByUrl').and.callThrough();
    bal_card.nativeElement.click();
    expect(registerSpy).toHaveBeenCalledTimes(1);

  });
});
