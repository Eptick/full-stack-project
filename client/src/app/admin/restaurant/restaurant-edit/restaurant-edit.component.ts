import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BalFileUpload } from '@baloise/design-system-components-angular';
import { BalValidators } from '@baloise/web-app-validators-angular';
import { catchError, finalize, throwError } from 'rxjs';
import Restaurant from 'src/app/model/Restaurant';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
import { MediaService } from 'src/app/services/media.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { RestaurantImageValidations, RestaurantNameValidations } from 'src/app/util/project-validations';

@Component({
  selector: 'app-restaurant-edit',
  templateUrl: './restaurant-edit.component.html',
  styleUrls: ['./restaurant-edit.component.scss']
})
export class RestaurantEditComponent implements OnInit {
  @ViewChild('f') f: NgForm;
  @ViewChild(BalFileUpload) uploadField: BalFileUpload;

  private restaurantId: number;
  public restaurant: Restaurant;

  initialLoading: boolean = false;
  loading: boolean = false;
  form = new FormGroup({
    name: new FormControl(null, RestaurantNameValidations),
    image: new FormControl(null, RestaurantImageValidations),
  })
  constructor(
    private restaurantService: RestaurantService,
    private errorHandling: ErrorHandlingService,
    private mediaService: MediaService,
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
        } else {
          this.errorHandling.handleHttpError(error);
        }
        return throwError(() => error);
      }),
      finalize(() => {
        this.initialLoading = false;
      })
    ).subscribe(data => {
      this.restaurant = data as Restaurant;
      this.form.setValue({ name: this.restaurant.name, image: this.restaurant.image });
    })
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
          this.errorHandling.handleHttpError(error);
          return throwError(() => error);
        }),
        finalize(() => {
          // this.loading = false;
        })
      ).subscribe(image => {
        this.image = image as number;
        this.uploadField.clear();
      })
    }
  }
  removeImage() {
    this.image = null;
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if(this.form.valid) {
      this.loading = true;
      this.form.disable();
      this.restaurantService.updateRestaurant({
          id: this.restaurantId,
          name: this.form.value.name,
          image: this.form.value.image,
        }).pipe(
        catchError(error => {
          this.errorHandling.handleHttpError(error)
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
