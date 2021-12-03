import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular'
import { BaloisePipeModule } from '@baloise/web-app-pipes-angular';
import { LoginLogoutButtonComponent } from './authentication/login-logout-button/login-logout-button.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LogoComponent } from './logo/logo.component'
import { AddBearerTokenInterceptor } from './add-bearer-token.interceptor';
import { AuthErrorInterceptorInterceptor } from './auth-error-interceptor.interceptor';
import { FooterComponent } from './footer/footer.component';
import { IsAdminDirective } from './directives/is-admin.directive';
import { InAdminSectionDirective } from './directives/in-admin-section.directive';
import { RestaurantOverviewComponent } from './admin/restaurant/restaurant-overview/restaurant-overview.component';
import { AdminOverviewComponent } from './admin/admin-overview/admin-overview.component';
import { RouterOutletComponent } from './util/router-outlet/router-outlet.component';
import { PagePaddingComponent } from './util/page-padding/page-padding.component';
import { AdminNavigationComponent } from './admin/admin-navigation/admin-navigation.component';
import { RestaurantCreateComponent } from './admin/restaurant/restaurant-create/restaurant-create.component';
import { EmptyComponent } from './util/empty/empty.component';
import { RestaurantEditComponent } from './admin/restaurant/restaurant-edit/restaurant-edit.component';
import { ImageUrlPipe } from './image-url.pipe';
import { RestaurantBackComponent } from './admin/restaurant/restaurant-back/restaurant-back.component';
import { ReviewBackComponent } from './admin/review/review-back/review-back.component';
import { ReviewCreateComponent } from './admin/review/review-create/review-create.component';
import { ReviewEditComponent } from './admin/review/review-edit/review-edit.component';
import { ReviewOverviewComponent } from './admin/review/review-overview/review-overview.component';
import { RatingComponent } from './util/rating/rating.component';
import { RatingInputComponent } from './util/rating-input/rating-input.component';
import { UserBackComponent } from './admin/user/user-back/user-back.component';
import { UserCreateComponent } from './admin/user/user-create/user-create.component';
import { UserOverviewComponent } from './admin/user/user-overview/user-overview.component';
import { UserEditComponent } from './admin/user/user-edit/user-edit.component';
import { RoleFormatPipe } from './pipes/role-format.pipe';
import { RestaurantCardComponent } from './restaurant/restaurant-card/restaurant-card.component';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AddBearerTokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptorInterceptor, multi: true },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LoginLogoutButtonComponent,
    RegisterComponent,
    LogoComponent,
    FooterComponent,
    IsAdminDirective,
    InAdminSectionDirective,
    RestaurantOverviewComponent,
    AdminOverviewComponent,
    RouterOutletComponent,
    PagePaddingComponent,
    AdminNavigationComponent,
    RestaurantCreateComponent,
    EmptyComponent,
    RestaurantEditComponent,
    ImageUrlPipe,
    RestaurantBackComponent,

    ReviewBackComponent,
    ReviewCreateComponent,
    ReviewEditComponent,
    ReviewOverviewComponent,
    RatingComponent,
    RatingInputComponent,
    UserBackComponent,
    UserCreateComponent,
    UserOverviewComponent,
    UserEditComponent,
    RoleFormatPipe,
    RestaurantCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,

    BaloisePipeModule,
    BaloiseDesignSystemModule.forRoot(),

  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
