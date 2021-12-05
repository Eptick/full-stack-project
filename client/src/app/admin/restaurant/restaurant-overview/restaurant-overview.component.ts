import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, finalize } from 'rxjs';
import Page from 'src/app/interfaces/Page';
import Restaurant from 'src/app/model/Restaurant';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-overview',
  templateUrl: './restaurant-overview.component.html',
  styleUrls: ['./restaurant-overview.component.scss']
})
export class RestaurantOverviewComponent implements OnInit {

  public loading: boolean = true;
  page: number = 10;
  public restaurants: Page<Restaurant>;

  constructor(
    private restaurantService: RestaurantService,
    private errorHandling: ErrorHandlingService,
  ) {

  }

  ngOnInit(): void {
    this.getRestaurants();
  }

  public getRestaurants(page = 0) {
    this.page = page;
    this.restaurantService.getRestaurants(page).pipe(
      catchError((error) => {
        this.errorHandling.handleHttpError(error)
        return EMPTY;
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((data) => {
      this.restaurants = data as Page<Restaurant>;
      if(this.restaurants.empty && this.restaurants.pageable.pageNumber > 0) {
        this.getRestaurants(--page);
      }
    })
  }

  public deleteRestaurant(restaurantId: number) {
    this.restaurantService.deleteRestaurant(restaurantId).pipe(
      catchError((error) => {
        this.errorHandling.handleHttpError(error);
        return EMPTY;
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((data) => {
      this.getRestaurants(this.page)
    })
  }



}
