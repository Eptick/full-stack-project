import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, throwError } from 'rxjs';
import Page from 'src/app/interfaces/Page';
import Restaurant, { RestaurantReport } from 'src/app/model/Restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.component.html',
  styleUrls: ['./restaurant-page.component.scss']
})
export class RestaurantPageComponent implements OnInit {

  restaurantId: number;
  restaurant: Restaurant;

  initialLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService) {
      const id = this.route.snapshot.paramMap.get('id')
      if(id) {
        this.restaurantId = parseInt(id as string);
      } else {
        this.router.navigate([".."]);
      }
  }

  getRestaurantReport() {
    this.restaurantService.getRestaurantReport(this.restaurantId).pipe(
      catchError(error => {
        return throwError(() => error);
      }),
      finalize(() => {
        this.initialLoading = false;
      })
    ).subscribe(data => {
      this.restaurant.report = data as RestaurantReport;
    })
  }

  ngOnInit(): void {
    this.initialLoading = true;
    this.restaurantService.getRestaurant(this.restaurantId).pipe(
      catchError(error => {
        if(error.status === 404) {
          this.router.navigate(["/"], { queryParams: {state: 'not-found'}});
        }
        return throwError(() => error);
      }),
      finalize(() => {
        this.initialLoading = false;
      })
    ).subscribe(data => {
      this.restaurant = data as Restaurant;
      if(this.restaurant.numberOfReviews > 0) {
        this.getRestaurantReport();
      }
    })
  }

}
