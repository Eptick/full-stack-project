import { Component } from '@angular/core';
import Restaurant from '../model/Restaurant';
import { ResourceService } from '../resource.service';
import { RestaurantService } from '../services/restaurant.service';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private resource: ResourceService,
    private reviewService: ReviewService,
    private restaurantService: RestaurantService,
  ) { }

  loadResource() {
    this.resource.getResource().subscribe(data => {
      console.log(data);
    })
  }

  loadRestaurants() {
    this.restaurantService.getRestaurants().subscribe(data => {
      console.log(data);
    })
  }

  createRestaurant() {
    this.restaurantService
      .createRestaurant(new Restaurant("Testni"))
      .subscribe(data => {
        console.log(data);
      })
  }

  loadReviews() {
    this.reviewService.getReviews().subscribe(data => {
      console.log(data);
    })
  }
}
