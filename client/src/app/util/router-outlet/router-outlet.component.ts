import { Component, OnInit } from '@angular/core';

@Component({
  template: '<app-page-padding><router-outlet></router-outlet></app-page-padding>',
})
export class RouterOutletComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
