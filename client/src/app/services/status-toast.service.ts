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
  "auth-failed": {
    message: "Session expired, you have been logged out",
    duration: 2500,
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
          const state: string = parsed.queryParams["state"]
          if(state && TOASTS[state]) {
            toasts.create(TOASTS[state])
            delete parsed.queryParams["state"]
            router.navigate([parsed.toString()], {replaceUrl: true})
          }

        }
      })
  }
}
