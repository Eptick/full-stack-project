import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize, throwError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { PasswordValidations, RestaurantImageValidations, UsernameValidations } from 'src/app/util/project-validations';

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
    roles: new FormControl(null, PasswordValidations),
  })
  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  onSubmit() {
    this.form.markAllAsTouched();
    debugger
    if(this.form.valid) {
      this.loading = true;
      this.form.disable();
      this.userService.saveUser(this.form.value).pipe(
        catchError(error => {
          return throwError(() => error);
        }),
        finalize(() => {
          this.form.enable();
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
