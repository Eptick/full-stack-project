import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
// import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';
import { Observable } from 'rxjs';

@Injectable()
export class AddBearerTokenInterceptor implements HttpInterceptor {

  constructor(private jwt: JwtService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!!this.jwt.token) {
      request = request.clone({
        setHeaders: {
          'Accept'       : 'application/json',
          'Authorization': `Bearer ${this.jwt.token}`,
        }
      });
    }
    return next.handle(request);
  }
}
