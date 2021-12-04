import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular';
import { RestaurantBackComponent } from '../restaurant-back/restaurant-back.component';

import { RestaurantCreateComponent } from './restaurant-create.component';

describe('RestaurantCreateComponent', () => {
  let component: RestaurantCreateComponent;
  let fixture: ComponentFixture<RestaurantCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule, RouterTestingModule, ReactiveFormsModule, BaloiseDesignSystemModule],
      declarations: [ RestaurantCreateComponent, RestaurantBackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
