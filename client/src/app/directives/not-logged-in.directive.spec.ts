import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RestaurantPageComponent } from '../restaurant/restaurant-page/restaurant-page.component';
import { NotLoggedInDirective } from './not-logged-in.directive';

describe('NotLoggedInDirective', () => {
  let fixture: ComponentFixture<any>;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ RestaurantPageComponent, NotLoggedInDirective ],
      schemas:      [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .createComponent(RestaurantPageComponent);
    TestBed.inject(HttpClient);
    TestBed.inject(HttpTestingController);

    fixture.detectChanges(); // initial binding
  });

  it('should have 0 app-login-to-leave-review', () => {
    (fixture.nativeElement);
    const items: HTMLElement[] = fixture.nativeElement.getElementsByTagName('app-login-to-leave-review');
    expect(items.length).toBe(0);
  });
});
