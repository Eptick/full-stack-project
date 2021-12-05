import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BalDatepicker } from '@baloise/design-system-components-angular';
import { catchError, debounceTime, EMPTY, finalize, map, Observable, Subject, switchMap } from 'rxjs';
import Page from 'src/app/interfaces/Page';
import Restaurant from 'src/app/model/Restaurant';
import User from 'src/app/model/User';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UserService } from 'src/app/services/user.service';
import {
  ReviewContentValidations,
  ReviewDateOfVisitValidations,
  ReviewRatingValidations,
  ReviewRestaurantValidations,
  ReviewUserValidations
} from 'src/app/util/project-validations';

@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.component.html',
  styleUrls: ['./review-create.component.scss']
})
export class ReviewCreateComponent implements AfterViewInit {
  @ViewChild('f') f: NgForm;
  @ViewChild(BalDatepicker) datepicker: BalDatepicker;

  autocompleteRestaurantResults$: Observable<Restaurant[]>;
  autoCompleteRestauratnSubject = new Subject<string>();

  autocompleteUserResults$: Observable<User[]>;
  autoCompleteUserSubject = new Subject<string>()

  loading: boolean = false;
  form = new FormGroup({
    restaurantId: new FormControl(null, ReviewRestaurantValidations),
    userId: new FormControl(null, ReviewUserValidations),
    dateOfVisit: new FormControl((new Date()).toISOString(), ReviewDateOfVisitValidations),
    content: new FormControl(null, ReviewContentValidations),
    rating: new FormControl(3, ReviewRatingValidations),
  })
  constructor(
    private restaurantService: RestaurantService,
    private errorHandling: ErrorHandlingService,
    private userService: UserService,
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
    this.autocompleteRestaurantResults$ = this.autoCompleteRestauratnSubject.pipe(
      debounceTime(400),
      map((searchText: string) => this.restaurantService.getRestaurants(0, searchText)),
      switchMap((request: Observable<Partial<Page<Restaurant>>>)=> request),
      map((response: Partial<Page<Restaurant>>)=> response.content as Restaurant[]),
    )
    this.autocompleteUserResults$ = this.autoCompleteUserSubject.pipe(
      debounceTime(400),
      map((searchText: string) => this.userService.getUsers(0, searchText)),
      switchMap((request: Observable<Partial<Page<User>>>)=> request),
      map((response: Partial<Page<User>>)=> response.content as User[]),
    )

  }

  getRestaurantAutocompleteValues(val: string) {
    if(val && val.length > 3) {
      this.autoCompleteRestauratnSubject.next(val);
    } else if(val.length === 0) {
      this.autoCompleteRestauratnSubject.next("");
    }
  }

  getUsersAutocompleteValues(val: string) {
    console.log(val)
    if(val && val.length > 3) {
      this.autoCompleteUserSubject.next(val);
    } else if(val.length === 0) {
      this.autoCompleteUserSubject.next("");
    }
  }

  onSubmit() {
    this.form.markAllAsTouched();
    console.log(this.form.value)
    if(this.form.valid) {
      this.loading = true;
      this.form.disable();
      this.restaurantService.addReview(this.form.value).pipe(
        catchError((error) => {
          this.errorHandling.handleHttpError(error);
          return EMPTY;
        }),
        finalize(() => {
          this.form.enable();
          this.loading = false;
        })
      ).subscribe(data => {
        this.router.navigate(["/admin/reviews"], {queryParams: {state: 'created'}})
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
