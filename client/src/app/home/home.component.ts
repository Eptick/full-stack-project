import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, finalize } from 'rxjs';
import Page from '../interfaces/Page';
import Restaurant from '../model/Restaurant';
import { DashboardService } from '../services/dashboard.service';
import { ErrorHandlingService } from '../services/error-handling.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  restaurantsLoading = true;
  restaurants: Page<Restaurant>;
  constructor(
    private errorHandling: ErrorHandlingService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.getRestaurants();
  }

  private getRestaurants() {
    const params: any = {
      page: 0,
      size: 3,
    };
    this.restaurantsLoading = true;
    this.dashboardService
      .getRestaurants(params)
      .pipe(
        catchError((error) => {
          this.errorHandling.handleHttpError(error)
          return EMPTY;
        }),
        finalize(() => {
          this.restaurantsLoading = false;
        })
      )
      .subscribe((data) => {
        this.restaurants = data as Page<Restaurant>;
      });
  }
}
