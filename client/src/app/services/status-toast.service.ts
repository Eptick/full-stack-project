import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { BalToastService } from '@baloise/design-system-components-angular';
import { filter } from 'rxjs';

const TOASTS: {[key: string]: any} = {
  "logged-out": {
    message: "Logged out",
    duration: 2500,
  },
  "logged-in": {
    message: "Successfully logged in",
    duration: 2500,
  },
  "created": {
    message: "Resource succesfully created",
    duration: 2500,
  },
  "not-found": {
    message: "Resource not found",
    duration: 2500,
    color: 'danger'
  },
  "resource-updated": {
    message: "Resource not found",
    duration: 2500,
    color: 'success',
  },
}

@Injectable({
  providedIn: 'root'
})
export class StatusToastService {
  constructor(router: Router, toasts: BalToastService) {
    router.events
      .pipe(
        filter((e: Event): e is RouterEvent => e instanceof RouterEvent)
     )
      .subscribe(e => {
        if(e instanceof NavigationEnd) {
          const parsed = router.parseUrl(e.url);
          console.log("params", parsed.queryParams)
          const state: string = parsed.queryParams["state"]
          console.log(TOASTS, TOASTS[state])
          if(state && TOASTS[state]) {
            console.log('toast')
            toasts.create(TOASTS[state])
            delete parsed.queryParams["state"]
            router.navigate([parsed.toString()], {replaceUrl: true})
          }

        }
      })
  }
}
