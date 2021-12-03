import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Directive({
  selector: '[notLoggedIn]',
})
export class NotLoggedInDirective {
  private hasView = false;
  private sub: Subscription;
  constructor(
    private auth: AuthenticationService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    this.check();
    this.sub = this.auth.loggedIn.subscribe(() => {
      this.check();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  check() {
    if (!this.auth.isLoggedIn && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (this.auth.isLoggedIn && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
