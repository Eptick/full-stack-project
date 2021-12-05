import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular';
import { AdminOverviewComponent } from 'src/app/admin/admin-overview/admin-overview.component';
import { AuthenticationService } from 'src/app/authentication.service';


// Other imports
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { LoginComponent } from './login.component';
import { RestaurantPageComponent } from 'src/app/restaurant/restaurant-page/restaurant-page.component';
import { CONSTANTS } from 'src/app/constants';

describe('LoginComponent', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;


  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule.withRoutes([
        {path: 'admin', component: AdminOverviewComponent},
        {path: 'restaurants', component: RestaurantPageComponent},
      ]), BaloiseDesignSystemModule],
      declarations: [ LoginComponent ],
    })
    .compileComponents();

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call auth login method', waitForAsync(() => {
    let loginElement: DebugElement;
    const debugElement = fixture.debugElement;
    let authService = debugElement.injector.get(AuthenticationService);
    let router = debugElement.injector.get(Router);
    let loginSpy = spyOn(authService , 'login').and.callThrough();
    let navigateSpy = spyOn(router , 'navigate').and.callThrough();

    loginElement = fixture.debugElement.query(By.css('form'));
    // to set values
    component.loginForm.controls['username'].setValue('user');
    component.loginForm.controls['password'].setValue('user');
    loginElement.triggerEventHandler('ngSubmit', null);
    const req = httpTestingController.expectOne(`${CONSTANTS.API_URL}/login`);
    expect(req.request.method).toBe("POST");
    req.flush({ access_token: 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwicm9sZXMiOiJST0xFX0FETUlOIiwiZXhwIjoxNjM4NzkzMzIwfQ.bsRpGI8L3Egu81mdPsswY9w9nQw8-vs-2X2HjCXtyeIyqTuZ11cjMsAspbeFY3rYsRP_i4BYHdwsxHoUHHxp79bNqicbjISO2yTYp9QF-7sUrB-po2-Jvhwa3nEBVF1kvHFh3sraHkI0PImd58LVVKDrWNEc3jCl8au5YdKNN3ZSSp9jsu28RP-jDoiBvQf81KSqU42_S9c_1YaeI3eOk8XzsUbcjfKM3nMBHC71T55AhDEDYDQZEHh9lBq7Ez0okWlHpqgSyvmjkZ1CCbQoZtiCCODWbrmlPbfRnX64y75XM4zpdd9BJEBrEINF1nIkSJ--IUFO_sWAQ0fexCFVXg'}, {status: 200, statusText: ''});

    expect(loginSpy).toHaveBeenCalledTimes(1); // check that service is called once
    expect(navigateSpy).toHaveBeenCalledTimes(1); // check that service is called once
    expect(navigateSpy).toHaveBeenCalledWith(['/admin'], { queryParams: { state: 'logged-in'}})

   }));

  it('should show wrong credentials message', waitForAsync(() => {
    let loginElement: DebugElement;
    const debugElement = fixture.debugElement;
    let authService = debugElement.injector.get(AuthenticationService);
    let router = debugElement.injector.get(Router);
    let loginSpy = spyOn(authService , 'login').and.callThrough();
    let navigateSpy = spyOn(router , 'navigate').and.callThrough();
    loginElement = fixture.debugElement.query(By.css('form'));
    // to set values
    component.loginForm.controls['username'].setValue('user');
    component.loginForm.controls['password'].setValue('user2');
    loginElement.triggerEventHandler('ngSubmit', null);
    const req = httpTestingController.expectOne(`http://localhost:8080/login`);
    expect(req.request.method).toBe("POST");
    req.flush(null, {status: 401, statusText: ''});
    expect(loginSpy).toHaveBeenCalledTimes(1); // check that service is called once

    expect(component.loginForm.get('username')?.getError('invalid')).toBeTruthy();
   }));
});
