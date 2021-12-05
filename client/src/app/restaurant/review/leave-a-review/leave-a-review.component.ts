import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BalDatepicker, BalToastService } from '@baloise/design-system-components-angular';
import { catchError, finalize, throwError } from 'rxjs';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { ReviewContentValidations, ReviewDateOfVisitValidations, ReviewRatingValidations, ReviewRestaurantValidations, ReviewUserValidations } from 'src/app/util/project-validations';

@Component({
  selector: 'app-leave-a-review',
  templateUrl: './leave-a-review.component.html',
  styleUrls: ['./leave-a-review.component.scss']
})
export class LeaveAReviewComponent implements AfterViewInit {
  _restaurantId: number;
  @ViewChild('f') f: NgForm;
  @ViewChild(BalDatepicker) datepicker: BalDatepicker;
  @Output("reviewed") reviewd: EventEmitter<void> = new EventEmitter();

  added: boolean = false;
  loading: boolean = false;
  form = new FormGroup({
    restaurantId: new FormControl(null, ReviewRestaurantValidations),
    dateOfVisit: new FormControl((new Date()).toISOString(), ReviewDateOfVisitValidations),
    content: new FormControl(null, ReviewContentValidations),
    rating: new FormControl(1, ReviewRatingValidations),
  })
  constructor(
    private errorHandling: ErrorHandlingService,
    private restaurantService: RestaurantService,
    private toast: BalToastService,
  ) {}

  ngAfterViewInit() {
    let today = new Date();
    let today_year = today.getFullYear();
    let today_month = today.getMonth() + 1;
    let today_day = today.getDate();
    this.datepicker.allowedDates = function(dateString) {
      const dates = dateString.split("-");
      const year =  parseInt(dates[0]);
      const month =  parseInt(dates[1]);
      const day =  parseInt(dates[2]);
      return year > today_year || today_month > month || today_day >= day;
    }
  }

  @Input("restaurantId")
  set restaurantId(val: number) {
    this._restaurantId = val;
    this.form.patchValue({restaurantId: val });
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if(this.form.valid) {
      this.loading = true;
      this.form.disable();
      this.restaurantService.addReview(this.form.value).pipe(
        catchError(error => {
          this.errorHandling.handleHttpError(error);
          return throwError(() => error);
        }),
        finalize(() => {
          this.form.enable();
          this.loading = false;
        })
      ).subscribe(data => {
        this.added = true;
        this.toast.create({
          color: 'success',
          message: 'Review succesfully added',
          duration: 2500,
        })
        this.reviewd.emit();
      })
    }
  }

  get rating() {
    return this.form.get('rating')?.value;
  }

  set rating(val: number) {
    const control = this.form.get('rating');
    control?.markAllAsTouched();
    control?.setValue(val);
  }

  submit() {
    this.f.ngSubmit.emit();
  }
}
