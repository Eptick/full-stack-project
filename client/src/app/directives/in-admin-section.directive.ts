import { Directive, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Event, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, Subscription, take } from 'rxjs';

@Directive({
  selector: '[isInAdminSection]'
})
export class InAdminSectionDirective implements OnDestroy {
  private hasView: boolean = false;
  private sub: Subscription;

  constructor(
    private router: Router,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) {
      this.sub = this.router.events
      .pipe(
        filter((e: Event): e is RouterEvent => e instanceof RouterEvent)
     )
      .subscribe(e => {
        if(e instanceof NavigationEnd) {
          const condition = e.url.startsWith("/admin");
          if (condition && !this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
          } else if (!condition && this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
          }
        }
      })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
