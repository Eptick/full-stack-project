import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantBackComponent } from './restaurant-back.component';

describe('RestaurantBackComponent', () => {
  let component: RestaurantBackComponent;
  let fixture: ComponentFixture<RestaurantBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantBackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
