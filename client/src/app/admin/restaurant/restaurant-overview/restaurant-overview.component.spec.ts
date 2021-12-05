import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular';

import { RestaurantOverviewComponent } from './restaurant-overview.component';

describe('RestaurantOverviewComponent', () => {
  let component: RestaurantOverviewComponent;
  let fixture: ComponentFixture<RestaurantOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BaloiseDesignSystemModule,
      ],
      declarations: [ RestaurantOverviewComponent ]
    })
    .compileComponents();

    TestBed.inject(HttpClient);
    TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
