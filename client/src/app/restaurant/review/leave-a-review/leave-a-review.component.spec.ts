import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular';
import { RatingInputComponent } from 'src/app/util/rating-input/rating-input.component';
import { RatingComponent } from 'src/app/util/rating/rating.component';

import { LeaveAReviewComponent } from './leave-a-review.component';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { getTodayYYYYMMDD } from 'src/app/util';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { CONSTANTS } from 'src/app/constants';


fdescribe('LeaveAReviewComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  let component: LeaveAReviewComponent;
  let fixture: ComponentFixture<LeaveAReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, BaloiseDesignSystemModule],
      declarations: [ LeaveAReviewComponent, RatingInputComponent, RatingComponent ]
    })
    .compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveAReviewComponent);
    component = fixture.componentInstance;
    component.restaurantId = 9;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have a date input', () => {
    let component = fixture.nativeElement.querySelector("bal-datepicker")
    expect(component).toBeTruthy();
  });

  it('should have a rating-input', () => {
    let component = fixture.nativeElement.querySelector("app-rating-input")
    expect(component).toBeTruthy();
  });

  it('should have a content-input', () => {
    let component = fixture.nativeElement.querySelector("bal-textarea ")
    expect(component).toBeTruthy();
  });

  it('should have a submit button', () => {
    let component = fixture.nativeElement.querySelector("bal-button")
    expect(component).toBeTruthy();
  });


  it('should submit a valid review', () => {
    let restaurantService = fixture.debugElement.injector.get(RestaurantService);
    let restaurantSpy = spyOn(restaurantService , 'addReview').and.callThrough();

    fixture.componentInstance.form.patchValue({
      dateOfVisit: getTodayYYYYMMDD(),
      content: 'Ovo je testni content od 20 znakova',
      rating: 5
    });
    fixture.componentInstance.f.ngSubmit.emit();
    expect(restaurantSpy).toHaveBeenCalledTimes(1); // check that service is called once
    const req = httpTestingController.expectOne(`${CONSTANTS.API_URL}/restaurants/9/review`);
    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual({
        restaurantId: 9,
        dateOfVisit: '2021-12-05',
        content: 'Ovo je testni content od 20 znakova',
        rating: 5
    });
    req.flush({ id: 1}, {status: 200, statusText: ''});
    fixture.detectChanges();

    let component = fixture.nativeElement.querySelector("bal-card-content")
    expect(component.innerHTML).toContain("left your mark");
  });
});
