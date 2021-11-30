import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Directive({
  selector: '[isAdmin]'
})
export class IsAdminDirective {
  private hasView = false;

  constructor(
    private auth: AuthenticationService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) {
      if (auth.isAdmin && !this.hasView) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      } else if (!auth.isAdmin && this.hasView) {
        this.viewContainer.clear();
        this.hasView = false;
      }
    }

}
