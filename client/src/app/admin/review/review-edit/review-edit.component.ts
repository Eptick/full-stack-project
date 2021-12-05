import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BalDatepicker, BalSelect } from '@baloise/design-system-components-angular';
import { catchError, debounceTime, EMPTY, finalize, map, merge, Observable, Subject, switchMap, tap } from 'rxjs';
import Page from 'src/app/interfaces/Page';
import Restaurant from 'src/app/model/Restaurant';
import Review from 'src/app/model/Review';
import User from 'src/app/model/User';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';
import { ReviewContentValidations, ReviewDateOfVisitValidations, ReviewRatingValidations, ReviewRestaurantValidations, ReviewUserValidations } from 'src/app/util/project-validations';

@Component({
  selector: 'app-review-edit',
  templateUrl: './review-edit.component.html',
  styleUrls: ['./review-edit.component.scss']
})
export class ReviewEditComponent implements AfterViewInit {
  @ViewChild('f') f: NgForm;
  @ViewChild(BalDatepicker) datepicker: BalDatepicker;

  @ViewChild('restaurantSelect') restaurantSelect: BalSelect;
  @ViewChild('userSelect') userSelect: BalSelect;


  reviewId: number;
  review: Review;

  autocompleteRestaurantResults$: Observable<Restaurant[]>;
  autoCompleteRestaurantDefault$: Subject<Restaurant[]> = new Subject();
  autoCompleteRestauratnSubject = new Subject<string>();

  autocompleteUserResults$: Observable<User[]>;
  autocompleteUserDefault$: Subject<User[]> = new Subject();
  autoCompleteUserSubject = new Subject<string>();

  initialLoading: boolean = false;
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
    private reviewService: ReviewService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    const id = this.route.snapshot.paramMap.get('id')
    if(id) {
      this.reviewId = parseInt(id as string);
    } else {
      this.router.navigate(["/admin/reviews"]);
    }
  }


  ngOnInit() {
    (window as any).autoCompleteRestaurantDefault$ = this.autoCompleteRestaurantDefault$;
    this.initialLoading = true;
    this.reviewService.getReview(this.reviewId).pipe(
      catchError((error) => {
        if(error.status === 404) {
          this.router.navigate(["/admin/review"], { queryParams: {state: 'not-found'}});
        }
        return EMPTY;
      }),
      finalize(() => {
        this.initialLoading = false;
      })
    ).subscribe(data => {
      this.review = data as Review;
      this.autoCompleteRestaurantDefault$.next([this.review.restaurant])
      this.autocompleteUserDefault$.next([this.review.user])
      this.form.patchValue({
        ...this.review,
        userId: this.review.user.id,
        restaurantId: this.review.restaurant.id,
      });
    })
  }

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
    this.autocompleteRestaurantResults$ = merge(
      this.autoCompleteRestaurantDefault$.pipe(
        tap(elem => console.log(elem))
      ),
      this.autoCompleteRestauratnSubject.pipe(
        debounceTime(400),
        map((searchText: string) => this.restaurantService.getRestaurants(0, searchText)),
        switchMap((request: Observable<Partial<Page<Restaurant>>>)=> request),
        map((response: Partial<Page<Restaurant>>)=> response.content as Restaurant[]),
      )
    )
    this.autocompleteUserResults$ = merge(
      this.autocompleteUserDefault$,
      this.autoCompleteUserSubject.pipe(
        debounceTime(400),
        map((searchText: string) => this.userService.getUsers(0, searchText)),
        switchMap((request: Observable<Partial<Page<User>>>)=> request),
        map((response: Partial<Page<User>>)=> response.content as User[]),
      )
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
      this.reviewService.updateReview({
        ...this.form.value,
        id: this.review.id,
      }).pipe(
        catchError((error) => {
          this.errorHandling.handleHttpError(error);
          return EMPTY;
        }),
        finalize(() => {
          this.form.enable();
          this.loading = false;
        })
      ).subscribe(data => {
        this.router.navigate(["/admin/reviews"], {queryParams: {state: 'updated'}})
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
