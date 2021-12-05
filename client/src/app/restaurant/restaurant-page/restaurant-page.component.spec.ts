import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular';
import { PagePaddingComponent } from 'src/app/util/page-padding/page-padding.component';
import { RatingComponent } from 'src/app/util/rating/rating.component';

import { RestaurantPageComponent } from './restaurant-page.component';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { DebugElement } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { CONSTANTS } from 'src/app/constants';
import { ImageUrlPipe } from 'src/app/image-url.pipe';
import { RestaurantReviewComponent } from '../review/restaurant-review/restaurant-review.component';
import { By } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/authentication.service';
import { NotLoggedInDirective } from 'src/app/directives/not-logged-in.directive';
import { IsLoggedInDirective } from 'src/app/directives/is-logged-in.directive';
import { LoginToLeaveReviewComponent } from '../review/login-to-leave-review/login-to-leave-review.component';
import { LeaveAReviewComponent } from '../review/leave-a-review/leave-a-review.component';
import { JwtService } from 'src/app/jwt.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RatingInputComponent } from 'src/app/util/rating-input/rating-input.component';
import TESTING_TOKEN from 'src/app/constants/token';

const mock_data = {"id":9,"name":"Grand","numberOfReviews":2,"averageRating":3.0,"image":15};
const mock_reviews = {"highest":{"id":10,"rating":5,"content":"dasda asd dsadassd adas ","user":{"id":5,"username":"user","enabled":true,"roleList":["ROLE_ADMIN"],"numberOfReviews":1},"restaurant":{"id":9,"name":"Grand","numberOfReviews":2,"averageRating":3.0,"image":15},"dateOfVisit":"2021-12-05","creationDate":"2021-12-05"},"lowest":{"id":11,"rating":1,"content":"This is my yeast favorite restaurant ever","user":{"id":7,"username":"user222","enabled":true,"roleList":["ROLE_USER"],"numberOfReviews":1},"restaurant":{"id":9,"name":"Grand","numberOfReviews":2,"averageRating":3.0,"image":15},"dateOfVisit":"2021-12-03","creationDate":"2021-12-05"},"latest":{"id":11,"rating":1,"content":"This is my yeast favorite restaurant ever","user":{"id":7,"username":"user222","enabled":true,"roleList":["ROLE_USER"],"numberOfReviews":1},"restaurant":{"id":9,"name":"Grand","numberOfReviews":2,"averageRating":3.0,"image":15},"dateOfVisit":"2021-12-03","creationDate":"2021-12-05"}}

describe('RestaurantPageComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  let component: RestaurantPageComponent;
  let fixture: ComponentFixture<RestaurantPageComponent>;

  let auth: AuthenticationService;
  let jwt: JwtService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, BaloiseDesignSystemModule],
      declarations: [ RestaurantPageComponent, PagePaddingComponent, RatingComponent, ImageUrlPipe, RestaurantReviewComponent, IsLoggedInDirective, NotLoggedInDirective, LoginToLeaveReviewComponent, LeaveAReviewComponent, RatingInputComponent ]
    })
    .compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantPageComponent);
    component = fixture.componentInstance;
    component.restaurantId = 9;
    fixture.detectChanges();
    let req = httpTestingController.expectOne(`${CONSTANTS.API_URL}/restaurants/9`);
    expect(req.request.method).toBe("GET");
    req.flush(mock_data);
    req = httpTestingController.expectOne(`${CONSTANTS.API_URL}/restaurants/9/reviews`);
    expect(req.request.method).toBe("GET");
    req.flush(mock_reviews);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the restaurant name', () => {

    let heading = fixture.nativeElement.querySelector("h4")
    expect(heading.textContent).toBe("Grand")
  });

  it('should display rating', () => {
    let rating = fixture.nativeElement.querySelector("app-rating")
    expect(rating).toBeTruthy();
  });

  it('should display rating', () => {
    let rating = fixture.nativeElement.querySelector("app-rating")
    expect(rating).toBeTruthy();
  });

  it('should display 3 reviews', () => {
    expect(fixture.debugElement.queryAll(By.css("app-restaurant-review")).length ).toBe(3) // check that service is called once
  });

  describe('when not logged in', () => {

    beforeEach(() => {
      auth = TestBed.inject(AuthenticationService);
      auth.logout();
      fixture.detectChanges();
    })

    it('should display login message', () => {
      fixture.detectChanges();
      let rating = fixture.nativeElement.querySelector("app-login-to-leave-review")
      expect(rating).toBeTruthy();
    })

  })

  describe('when logged in', () => {

    beforeEach(() => {
      jwt = TestBed.inject(JwtService);
      jwt.setToken(TESTING_TOKEN)
      fixture.detectChanges();
    })

    it('should display login message', () => {
      fixture.detectChanges();
      let rating = fixture.nativeElement.querySelector("app-leave-a-review")
      expect(rating).toBeTruthy();
    })

  })
;
});
