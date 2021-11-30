import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BalValidators } from '@baloise/web-app-validators-angular';
import { catchError, finalize, throwError } from 'rxjs';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-create',
  templateUrl: './restaurant-create.component.html',
  styleUrls: ['./restaurant-create.component.scss']
})
export class RestaurantCreateComponent {
  @ViewChild('f') f: NgForm;

  loading: boolean = false;
  form = new FormGroup({
    name: new FormControl(null, [BalValidators.isRequired(), BalValidators.isMinLength(4)]),
  })
  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
  ) { }


  onSubmit() {
    if(this.form.valid) {
      this.loading = true;
      this.form.disable();
      this.restaurantService.createRestaurant({name: this.form.value.name}).pipe(
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
