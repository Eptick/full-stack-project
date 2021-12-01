import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BalFileUpload } from '@baloise/design-system-components-angular';
import { catchError, finalize, throwError } from 'rxjs';
import { MediaService } from 'src/app/services/media.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { RestaurantImageValidations, RestaurantNameValidations } from 'src/app/util/project-validations';

@Component({
  selector: 'app-restaurant-create',
  templateUrl: './restaurant-create.component.html',
  styleUrls: ['./restaurant-create.component.scss']
})
export class RestaurantCreateComponent {
  @ViewChild('f') f: NgForm;
  @ViewChild(BalFileUpload) uploadElement: BalFileUpload;

  loading: boolean = false;
  form = new FormGroup({
    name: new FormControl(null, RestaurantNameValidations),
    image: new FormControl(null, RestaurantImageValidations)
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
      this.restaurantService.createRestaurant({
        name: this.form.value.name,
        image: this.form.value.image,
      }).pipe(
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

  get image() {
    return this.form.get('image')?.value ?? null;
  }

  set image(val: number | null) {
    this.form.get("image")?.markAsDirty();
    this.form.get("image")?.markAsTouched();
    this.form.patchValue({ image: val });
  }

  fileUpload(e: any) {
    const file: File = e.detail[0];
    if(file) {
      this.mediaService.uploadFile(file).pipe(
        catchError(error => {
          return throwError(() => error);
        }),
        finalize(() => {
          // this.loading = false;
        })
      ).subscribe(image => {
        this.image = image as number;
        this.uploadElement.clear();
      })
    }
  }

  removeImage() {
    this.image = null;
  }

  submit() {
    this.f.ngSubmit.emit();
  }
}
