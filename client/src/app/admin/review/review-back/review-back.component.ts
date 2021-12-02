import { Component } from '@angular/core';

@Component({
  selector: 'app-review-back',
  template: `
  <div class="bal-buttons is-right columns">
    <div class="is-half"><bal-button color="info-light" icon="nav-back" class="" [routerLink]="['/admin/reviews']">Back</bal-button></div>
  </div>
  `
})
export class ReviewBackComponent {
}
