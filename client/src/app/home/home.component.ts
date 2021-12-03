import { Component, OnInit } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import Page from '../interfaces/Page';
import Restaurant from '../model/Restaurant';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  restaurantsLoading = true;
  restaurants: Page<Restaurant>;
  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.getRestaurants();
  }

  private getRestaurants() {
    const params: any = {
      page: 0,
      limit: 3,
      size: 3,
    };
    this.restaurantsLoading = true;
    this.dashboardService
      .getRestaurants(params)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        }),
        finalize(() => {
          this.restaurantsLoading = false;
        })
      )
      .subscribe((data) => {
        this.restaurants = data as Page<Restaurant>;
        console.log(data);
      });
  }
}
