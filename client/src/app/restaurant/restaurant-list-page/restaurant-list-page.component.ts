import { Component, OnInit } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import Page from 'src/app/interfaces/Page';
import PagingAndSorting from 'src/app/model/PagingAndSorting';
import Restaurant from 'src/app/model/Restaurant';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-restaurant-list-page',
  templateUrl: './restaurant-list-page.component.html',
  styleUrls: ['./restaurant-list-page.component.scss']
})
export class RestaurantListPageComponent implements OnInit {

  public loading: boolean = true;
  page: number = 0;
  public restaurants: Page<Restaurant>;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getRestaurants();
  }

  public getRestaurants(params: PagingAndSorting = {
    page: 0,
  }) {
    this.dashboardService.getRestaurants(params).pipe(
      catchError(error => {
        return throwError(() => error);
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((data) => {
      this.restaurants = data as Page<Restaurant>;
      if(this.restaurants.empty && this.restaurants.pageable.pageNumber > 0) {
        this.getRestaurants({
          page: (params.page ?? 0) - 1
        });
      }
    })
  }

}
