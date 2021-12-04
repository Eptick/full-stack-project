import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { IsAdminGuard } from './is-admin.guard';

describe('IsAdminGuard', () => {
  let guard: IsAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule]
    });
    guard = TestBed.inject(IsAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
