import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BalDatepicker } from '@baloise/design-system-components-angular';
import { catchError, debounceTime, finalize, map, Observable, Subject, switchMap, throwError } from 'rxjs';
import Page from 'src/app/interfaces/Page';
import Restaurant from 'src/app/model/Restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { ReviewContantValidations, ReviewRatingValidations, ReviewRestaurantValidations } from 'src/app/util/project-validations';

@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.component.html',
  styleUrls: ['./review-create.component.scss']
})
export class ReviewCreateComponent implements AfterViewInit {
  @ViewChild('f') f: NgForm;
  @ViewChild(BalDatepicker) datepicker: BalDatepicker;

  autocompleteResults$: Observable<Restaurant[]>;
  autoCompleteSubject = new Subject<string>()

  loading: boolean = false;
  form = new FormGroup({
    restaurantId: new FormControl(null, ReviewRestaurantValidations),
    dateOfVisit: new FormControl((new Date()).toISOString(), ReviewRatingValidations),
    content: new FormControl(null, ReviewContantValidations),
    rating: new FormControl(3, ReviewRatingValidations),
  })
  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
  ) { }

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
    this.autocompleteResults$ = this.autoCompleteSubject.pipe(
      debounceTime(400),
      map((searchText: string) => this.restaurantService.getRestaurants(0, searchText)),
      switchMap((request: Observable<Partial<Page<Restaurant>>>)=> request),
      map((response: Partial<Page<Restaurant>>)=> response.content as Restaurant[]),
  )
  }

  getAutocompleteValues(val: string) {
    if(val && val.length > 3) {
      this.autoCompleteSubject.next(val);
    }
  }


  onSubmit() {
    this.form.markAllAsTouched();
    console.log(this.form.value)
    if(this.form.valid) {
      this.loading = true;
      this.form.disable();
      this.restaurantService.addReview(
        this.form.value.dateOfVisit as string,
        this.form.value.content as string,
        this.form.value.rating as number,
        this.form.value.restaurantId as number,
      ).pipe(
        catchError(error => {
          return throwError(() => error);
        }),
        finalize(() => {
          this.form.enable();
          this.loading = false;
        })
      ).subscribe(data => {
        this.router.navigate(["/admin/restaurants"], {queryParams: {state: 'created'}})
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
