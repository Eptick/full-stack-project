import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular';

import { LoginToLeaveReviewComponent } from './login-to-leave-review.component';

describe('LoginToLeaveReviewComponent', () => {
  let component: LoginToLeaveReviewComponent;
  let fixture: ComponentFixture<LoginToLeaveReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaloiseDesignSystemModule],
      declarations: [ LoginToLeaveReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginToLeaveReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
