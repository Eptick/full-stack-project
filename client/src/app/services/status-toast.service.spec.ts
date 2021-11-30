import { TestBed } from '@angular/core/testing';

import { StatusToastService } from './status-toast.service';

describe('StatusToastService', () => {
  let service: StatusToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
