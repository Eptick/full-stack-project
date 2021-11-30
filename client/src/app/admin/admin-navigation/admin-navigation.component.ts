import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-navigation',
  templateUrl: './admin-navigation.component.html',
  styleUrls: ['./admin-navigation.component.scss']
})
export class AdminNavigationComponent implements OnDestroy {

  private sub: Subscription;
  public url: string = '/';

  constructor(private router: Router) {
    this.sub = this.router.events
    .pipe(
      filter((e: Event): e is RouterEvent => e instanceof RouterEvent)
   )
    .subscribe(e => {
      if(e instanceof NavigationEnd) {
        this.url = e.url;
      }
    })
  }

  navigate(params: string[]) {
    this.router.navigate(params)
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
