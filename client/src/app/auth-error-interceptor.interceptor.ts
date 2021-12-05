import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { BalToastService } from '@baloise/design-system-components-angular';
import { AuthenticationService } from './authentication.service';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthErrorInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private jwt: JwtService,
    private router: Router,
    public toast: BalToastService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.jwt.setToken('');
          this.router.navigate(['/login'], {
            queryParams: { status: 'auth-failed' },
          });
        } else if (error.status === 403) {
          this.toast.create({
            message: 'Access to this is denied',
            color: 'danger',
            duration: 3000,
          });
        }
        return throwError(() => error);
      })
    );
  }
}
