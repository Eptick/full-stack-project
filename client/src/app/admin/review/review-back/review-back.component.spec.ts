import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular';

import { ReviewBackComponent } from './review-back.component';

describe('ReviewBackComponent', () => {
  let component: ReviewBackComponent;
  let fixture: ComponentFixture<ReviewBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BaloiseDesignSystemModule,
        RouterTestingModule,
      ],
      declarations: [ ReviewBackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
