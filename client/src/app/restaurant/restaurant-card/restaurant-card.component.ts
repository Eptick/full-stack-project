import { Component, Input, OnInit } from '@angular/core';
import Restaurant from 'src/app/model/Restaurant';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss']
})
export class RestaurantCardComponent implements OnInit {

  @Input() restaurant: Partial<Restaurant>;

  constructor() { }

  ngOnInit(): void {
  }

}
