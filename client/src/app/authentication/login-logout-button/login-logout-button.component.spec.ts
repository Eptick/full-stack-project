import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular';

import { LoginLogoutButtonComponent } from './login-logout-button.component';

describe('LoginLogoutButtonComponent', () => {
  let component: LoginLogoutButtonComponent;
  let fixture: ComponentFixture<LoginLogoutButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, BaloiseDesignSystemModule],
      declarations: [ LoginLogoutButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginLogoutButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
