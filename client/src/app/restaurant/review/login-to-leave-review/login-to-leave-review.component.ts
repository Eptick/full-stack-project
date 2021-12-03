import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-to-leave-review',
  template: `<bal-text class="my-5 is-block">Want to leave a review yourself? Please <a href="#" [routerLink]="['/login']">login here</a><bal-text>`
})
export class LoginToLeaveReviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
