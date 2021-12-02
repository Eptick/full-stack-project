import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, debounce, debounceTime, finalize, throwError } from 'rxjs';
import Page from 'src/app/interfaces/Page';
import Restaurant from 'src/app/model/Restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { ReviewContantValidations, ReviewRatingValidations, ReviewRestaurantValidations } from 'src/app/util/project-validations';

@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.component.html',
  styleUrls: ['./review-create.component.scss']
})
export class ReviewCreateComponent {
  @ViewChild('f') f: NgForm;

  autocompleteData: Restaurant[] = [];

  loading: boolean = false;
  form = new FormGroup({
    content: new FormControl(null, ReviewContantValidations),
    rating: new FormControl(null, ReviewRatingValidations),
    restaurantId: new FormControl(null, ReviewRestaurantValidations),
  })
  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
  ) { }

  getAutocompleteValues(val: string) {
    if(val && val.length > 3) {
      this.restaurantService.getRestaurants(0, val)
      .pipe(
        debounceTime(3000     ),
        catchError(error => {
          return throwError(() => error);
        }),
        finalize(() => {
          console.log("a");
        })
      ).subscribe((data: any) => {
        this.autocompleteData = data.content
      })
    }
  }


  onSubmit() {
    this.form.markAllAsTouched();
    if(this.form.valid) {
      this.loading = true;
      this.form.disable();
      this.restaurantService.addReview(
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

  submit() {
    this.f.ngSubmit.emit();
  }
}
