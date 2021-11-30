import { Component, OnInit, ViewChildren } from '@angular/core';
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
  page: number = 10;
  public restaurants: Page<Restaurant>;
  public selected: number[] = [];

  constructor(private restaurantService: RestaurantService) {

  }

  ngOnInit(): void {
    this.getRestaurants();
  }

  toggleSelected(restaurantId: number, checked: boolean) {
    if(checked) {
      this.selected.push(restaurantId);
    } else {
      this.selected = this.selected.filter(elem => elem !== restaurantId);
    }
  }

  bulkDelete() {
    this.restaurantService.deleteRestaurants(this.selected).pipe(
      catchError(error => {
        return throwError(() => error);
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe(() => {
      this.getRestaurants();
    })
  }

  public getRestaurants(page = 0) {
    this.page = page;
    this.restaurantService.getRestaurants(page).pipe(
      catchError(error => {
        return throwError(() => error);
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((data) => {
      this.selected= [];
      this.restaurants = data as Page<Restaurant>;
      if(this.restaurants.empty && this.restaurants.pageable.pageNumber > 0) {
        this.getRestaurants(--page);
      }
    })
  }

  public deleteRestaurant(restaurantId: number) {
    this.restaurantService.deleteRestaurant(restaurantId).pipe(
      catchError(error => {
        return throwError(() => error);
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((data) => {
      this.getRestaurants(this.page)
    })
  }



}
