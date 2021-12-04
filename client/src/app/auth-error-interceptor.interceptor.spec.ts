import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthErrorInterceptorInterceptor } from './auth-error-interceptor.interceptor';

describe('AuthErrorInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    providers: [
      AuthErrorInterceptorInterceptor
    ]
  }));

  it('should be created', () => {
    const interceptor: AuthErrorInterceptorInterceptor = TestBed.inject(AuthErrorInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
