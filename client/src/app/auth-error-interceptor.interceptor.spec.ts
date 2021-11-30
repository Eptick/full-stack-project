import { TestBed } from '@angular/core/testing';

import { AuthErrorInterceptorInterceptor } from './auth-error-interceptor.interceptor';

describe('AuthErrorInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthErrorInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthErrorInterceptorInterceptor = TestBed.inject(AuthErrorInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
