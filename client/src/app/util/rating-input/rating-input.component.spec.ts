import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular';
import { RatingComponent } from '../rating/rating.component';

import { RatingInputComponent } from './rating-input.component';

describe('RatingInputComponent', () => {
  let component: RatingInputComponent;
  let fixture: ComponentFixture<RatingInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaloiseDesignSystemModule],
      declarations: [ RatingInputComponent, RatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
