import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular';
import { AdminNavigationComponent } from './admin/admin-navigation/admin-navigation.component';
import { AppComponent } from './app.component';
import { LoginLogoutButtonComponent } from './authentication/login-logout-button/login-logout-button.component';
import { FooterComponent } from './footer/footer.component';
import { LogoComponent } from './logo/logo.component';
import { RatingComponent } from './util/rating/rating.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BaloiseDesignSystemModule,
        HttpClientModule,
      ],
      declarations: [
        AppComponent,
        FooterComponent,
        LoginLogoutButtonComponent,
        AdminNavigationComponent,
        LogoComponent,
        RatingComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have a home method'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.home).toBeDefined();
  });

  it('should render a menu', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('bal-navbar-menu')).toBeDefined();
  });
});
