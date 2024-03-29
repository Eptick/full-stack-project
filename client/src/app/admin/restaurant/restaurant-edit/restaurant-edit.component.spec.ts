import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular';
import { RestaurantBackComponent } from '../restaurant-back/restaurant-back.component';

import { RestaurantEditComponent } from './restaurant-edit.component';

describe('RestaurantEditComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  let component: RestaurantEditComponent;
  let fixture: ComponentFixture<RestaurantEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BaloiseDesignSystemModule,
      ],
      declarations: [ RestaurantEditComponent, RestaurantBackComponent ]
    })
    .compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
