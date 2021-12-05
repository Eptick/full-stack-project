import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular';

import { RegisterComponent } from './register.component';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';
import { DebugElement } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { CONSTANTS } from 'src/app/constants';

describe('RegisterComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;


  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {path: 'login', component: LoginComponent},
        ]),
        ReactiveFormsModule,
        BaloiseDesignSystemModule
      ],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();

     // Inject the http service and test controller for each test
     httpClient = TestBed.inject(HttpClient);
     httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call auth register method and transfer to login', waitForAsync(() => {
    let registerElement: DebugElement;
    const debugElement = fixture.debugElement;
    let authService = debugElement.injector.get(AuthenticationService);
    let router = debugElement.injector.get(Router);
    let registerSpy = spyOn(authService , 'register').and.callThrough();
    let navigateSpy = spyOn(router , 'navigate').and.callThrough();

    registerElement = fixture.debugElement.query(By.css('form'));
    // to set values
    component.registerForm.controls['username'].setValue('user');
    component.registerForm.controls['password'].setValue('user');
    registerElement.triggerEventHandler('ngSubmit', null);
    const req = httpTestingController.expectOne(`${CONSTANTS.API_URL}/register`);
    expect(req.request.method).toBe("POST");
    req.flush({ id: 1}, {status: 200, statusText: ''});

    expect(registerSpy).toHaveBeenCalledTimes(1); // check that service is called once
    expect(navigateSpy).toHaveBeenCalledTimes(1); // check that service is called once
    expect(navigateSpy).toHaveBeenCalledWith(['/login'], { queryParams: { state: 'registered'}})

   }));


  it('should should show taken username', waitForAsync(() => {
    let registerElement: DebugElement;
    const debugElement = fixture.debugElement;
    let authService = debugElement.injector.get(AuthenticationService);
    let registerSpy = spyOn(authService , 'register').and.callThrough();


    registerElement = fixture.debugElement.query(By.css('form'));
    // to set values
    component.registerForm.controls['username'].setValue('user');
    component.registerForm.controls['password'].setValue('user');
    registerElement.triggerEventHandler('ngSubmit', null);
    const req = httpTestingController.expectOne(`${CONSTANTS.API_URL}/register`);
    expect(req.request.method).toBe("POST");
    req.flush(null, {status: 409, statusText: ''});

    expect(registerSpy).toHaveBeenCalledTimes(1); // check that service is called once
    expect(component.form.control.get('username')?.getError('taken')).toBeTruthy();

   }));

});
