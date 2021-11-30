import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BalToastService } from '@baloise/design-system-components-angular';
import Restaurant from '../model/Restaurant';
import { ResourceService } from '../resource.service';
import { RestaurantService } from '../services/restaurant.service';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toast: BalToastService,
    private resource: ResourceService,
    private reviewService: ReviewService,
    private restaurantService: RestaurantService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: {state?: string})  => {
      if(params.state === 'logged-out') {
        this.toast.create({
          message: 'Logged out',
          color: 'success',
          duration: 2500
        })
        this.router.navigate(['/'])
      }
      if(params.state === 'logged-in') {
        this.toast.create({
          message: 'Log in successful',
          color: 'success',
          duration: 2500
        })
        this.router.navigate(['/'])
      }
    })
  }

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

  createReview() {
    this.restaurantService
      .addReview("test content", 5, 1)
      .subscribe(data => {
        console.log(data);
      })
  }
}
