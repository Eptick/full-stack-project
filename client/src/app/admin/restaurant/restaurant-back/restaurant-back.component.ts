import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant-back',
  template: `
  <div class="bal-buttons is-right columns">
    <div class="is-half"><bal-button color="info-light" icon="nav-back" class="" [routerLink]="['/admin/restaurants']">Back</bal-button></div>
  </div>
  `
})
export class RestaurantBackComponent {
}
