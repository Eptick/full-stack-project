import { Component, Input, OnInit } from '@angular/core';
import Review from 'src/app/model/Review';

@Component({
  selector: 'app-restaurant-review',
  templateUrl: './restaurant-review.component.html',
  styleUrls: ['./restaurant-review.component.scss']
})
export class RestaurantReviewComponent implements OnInit {

  @Input() review: Review;

  constructor() { }

  ngOnInit(): void {
  }

}
