import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { StatusToastService } from './status-toast.service';

describe('StatusToastService', () => {
  let service: StatusToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule]
    });
    service = TestBed.inject(StatusToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
