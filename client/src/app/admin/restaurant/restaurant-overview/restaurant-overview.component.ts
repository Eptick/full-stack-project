import { Component, OnInit } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import Page from 'src/app/interfaces/Page';
import Restaurant from 'src/app/model/Restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-overview',
  templateUrl: './restaurant-overview.component.html',
  styleUrls: ['./restaurant-overview.component.scss']
})
export class RestaurantOverviewComponent implements OnInit {

  public loading: boolean = true;
  page: number = 1;
  public restaurants: Page<Restaurant>;

  constructor(private restaurantService: RestaurantService) {

  }

  ngOnInit(): void {
    this.getRestaurants();
  }

  public getRestaurants(page = 0) {
    this.restaurantService.getRestaurants(page).pipe(
      catchError(error => {
        return throwError(() => error);
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((data) => {
      this.restaurants = data as Page<Restaurant>;
    })
  }

}
