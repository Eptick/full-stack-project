import { TestBed } from '@angular/core/testing';

import { AddBearerTokenInterceptor } from './add-bearer-token.interceptor';

describe('AddBearerTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AddBearerTokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AddBearerTokenInterceptor = TestBed.inject(AddBearerTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
