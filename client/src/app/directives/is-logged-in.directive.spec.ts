import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RestaurantPageComponent } from '../restaurant/restaurant-page/restaurant-page.component';
import { IsLoggedInDirective } from './is-logged-in.directive';

describe('IsLoggedInDirective', () => {
  let fixture: ComponentFixture<any>;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ RestaurantPageComponent, IsLoggedInDirective ],
      schemas:      [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .createComponent(RestaurantPageComponent);
    fixture.detectChanges(); // initial binding
  });

  it('should have 0 app-leave-a-review', () => {
    const items: HTMLElement[] = fixture.nativeElement.getElementsByTagName('app-leave-a-review');
    expect(items.length).toBe(0);
  });
});
