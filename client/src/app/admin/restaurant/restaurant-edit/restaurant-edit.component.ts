import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BalValidators } from '@baloise/web-app-validators-angular';
import { catchError, finalize, throwError } from 'rxjs';
import Restaurant from 'src/app/model/Restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { RestaurantNameValidations } from 'src/app/util/project-validations';

@Component({
  selector: 'app-restaurant-edit',
  templateUrl: './restaurant-edit.component.html',
  styleUrls: ['./restaurant-edit.component.scss']
})
export class RestaurantEditComponent implements OnInit {
  @ViewChild('f') f: NgForm;

  private restaurantId: number;
  public restaurant: Restaurant;

  initialLoading: boolean = false;
  loading: boolean = false;
  form = new FormGroup({
    name: new FormControl(null, RestaurantNameValidations),
  })
  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    const id = this.route.snapshot.paramMap.get('id')
    if(id) {
      this.restaurantId = parseInt(id as string);
    } else {
      this.router.navigate([".."]);
    }
  }


  ngOnInit() {
    this.initialLoading = true;
    this.restaurantService.getRestaurant(this.restaurantId).pipe(
      catchError(error => {
        if(error.status === 404) {
          this.router.navigate(["/admin/restaurants"], { queryParams: {state: 'not-found'}});
        }
        return throwError(() => error);
      }),
      finalize(() => {
        this.initialLoading = false;
      })
    ).subscribe(data => {
      this.restaurant = data as Restaurant;
      this.form.setValue({ name: this.restaurant.name });
    })
  }


  onSubmit() {
    if(this.form.valid) {
      this.loading = true;
      this.form.disable();
      this.restaurantService.updateRestaurant({id: this.restaurantId,name: this.form.value.name}).pipe(
        catchError(error => {
          return throwError(() => error);
        }),
        finalize(() => {
          this.form.enable();
          this.loading = false;
        })
      ).subscribe(data => {
        this.router.navigate(["/admin/restaurants"], {queryParams: {state: 'updated'}})
      })
    }
  }

  submit() {
    this.f.ngSubmit.emit();
  }

}
