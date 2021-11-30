import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { HomeComponent } from './home/home.component';
import { NotLoggedInGuard } from './guards/not-logged-in.guard';
import { IsAdminGuard } from './guards/is-admin.guard';
import { RestaurantOverviewComponent } from './admin/restaurant/restaurant-overview/restaurant-overview.component';
import { AdminOverviewComponent } from './admin/admin-overview/admin-overview.component';
import { RouterOutletComponent } from './util/router-outlet/router-outlet.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent, canActivate: [NotLoggedInGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [NotLoggedInGuard]},

  {path: 'admin', component: RouterOutletComponent, canActivate: [IsAdminGuard],
    children: [
      {path: '', component: AdminOverviewComponent, pathMatch: 'full'},
      {path: 'restaurants', component: RouterOutletComponent, children: [
        { path: '', pathMatch: 'full', component: RestaurantOverviewComponent }
      ]},
    ],
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
