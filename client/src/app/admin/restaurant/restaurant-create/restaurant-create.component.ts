import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize, throwError } from 'rxjs';
import { MediaService } from 'src/app/services/media.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { RestaurantNameValidations } from 'src/app/util/project-validations';

@Component({
  selector: 'app-restaurant-create',
  templateUrl: './restaurant-create.component.html',
  styleUrls: ['./restaurant-create.component.scss']
})
export class RestaurantCreateComponent {
  @ViewChild('f') f: NgForm;

  loading: boolean = false;
  form = new FormGroup({
    name: new FormControl(null, RestaurantNameValidations),
  })
  constructor(
    private restaurantService: RestaurantService,
    private mediaService: MediaService,
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

  fileUpload(e: any) {
    console.log(e);
    const file: File = e.detail[0];
    if(file) {
      this.mediaService.uploadFile(file).pipe(
        catchError(error => {
          return throwError(() => error);
        }),
        finalize(() => {
          // this.loading = false;
        })
      ).subscribe(data => {
        // this.router.navigate(["/admin/restaurants"], {queryParams: {state: 'created'}})
      })
    }
  }
}
