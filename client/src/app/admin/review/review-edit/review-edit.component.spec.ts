import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular';
import { RatingInputComponent } from 'src/app/util/rating-input/rating-input.component';
import { RatingComponent } from 'src/app/util/rating/rating.component';
import { ReviewBackComponent } from '../review-back/review-back.component';
import { ReviewCreateComponent } from '../review-create/review-create.component';

import { ReviewEditComponent } from './review-edit.component';

describe('ReviewEditComponent', () => {
  let component: ReviewEditComponent;
  let fixture: ComponentFixture<ReviewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        BaloiseDesignSystemModule,
      ],
      declarations: [ ReviewEditComponent, ReviewBackComponent, RatingInputComponent, RatingComponent],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
