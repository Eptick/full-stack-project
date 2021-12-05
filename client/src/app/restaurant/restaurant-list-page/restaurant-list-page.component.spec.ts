import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular';
import { PagePaddingComponent } from 'src/app/util/page-padding/page-padding.component';
import { RatingInputComponent } from 'src/app/util/rating-input/rating-input.component';
import { RatingComponent } from 'src/app/util/rating/rating.component';

import { RestaurantListPageComponent } from './restaurant-list-page.component';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { CONSTANTS } from 'src/app/constants';
import { RestaurantCardComponent } from '../restaurant-card/restaurant-card.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ImageUrlPipe } from 'src/app/image-url.pipe';

const mock_data = {"content":[{"id":9,"name":"Grand","numberOfReviews":2,"averageRating":3.0,"image":15}],"pageable":{"sort":{"sorted":false,"unsorted":true,"empty":true},"pageSize":9,"pageNumber":0,"offset":0,"paged":true,"unpaged":false},"last":true,"totalPages":1,"totalElements":1,"sort":{"sorted":false,"unsorted":true,"empty":true},"first":true,"numberOfElements":1,"size":9,"number":0,"empty":false}


describe('RestaurantListPageComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  let component: RestaurantListPageComponent;
  let fixture: ComponentFixture<RestaurantListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BaloiseDesignSystemModule,
        RouterTestingModule,
      ],
      declarations: [
        RestaurantListPageComponent,
        PagePaddingComponent,
        RatingComponent,
        RatingInputComponent,
        RestaurantCardComponent,
        ImageUrlPipe
      ]
    })
    .compileComponents();

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    fixture = TestBed.createComponent(RestaurantListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display call the endpoint to get restaurant list', waitForAsync(() => {
    fixture = TestBed.createComponent(RestaurantListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const req = httpTestingController.expectOne(`${CONSTANTS.API_URL}/dashboard/restaurants?page=0&size=9`);
    expect(req.request.method).toBe("GET");
    req.flush(mock_data);
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css("app-restaurant-card")).length ).toBe(1) // check that service is called once

   }));
});
