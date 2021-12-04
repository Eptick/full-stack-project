import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize, throwError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { PasswordValidations, RestaurantImageValidations, RolesValidations, UsernameValidations } from 'src/app/util/project-validations';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {
  @ViewChild('f') f: NgForm;

  loading: boolean = false;
  form = new FormGroup({
    username: new FormControl(null, UsernameValidations),
    password: new FormControl(null, PasswordValidations),
    roles: new FormControl(null, RolesValidations),
  })
  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  onSubmit() {
    this.form.markAllAsTouched();
    this.form.markAsDirty();
    if(this.form.valid) {
      this.loading = true;
      this.userService.saveUser(this.form.value).pipe(
        catchError(error => {
          if(error.status === 409) {
            this.form.get("username")?.setErrors({taken: "Username is already taken"})
          }
          return( throwError(() => error));
        }),
        finalize(() => {
          this.loading = false;
        })
      ).subscribe(data => {
        this.router.navigate(["/admin/users"], {queryParams: {state: 'created'}})
      })
    }
  }

  submit() {
    this.f.ngSubmit.emit();
  }

}
