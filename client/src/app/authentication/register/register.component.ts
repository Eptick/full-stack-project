import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { BalValidators } from '@baloise/web-app-validators-angular';
import { catchError, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
import { UsernameValidations } from 'src/app/util/project-validations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  @ViewChild('register_form') form: NgForm;

  registerForm = new FormGroup({
    username: new FormControl('user', UsernameValidations),
    password: new FormControl('password', [BalValidators.isRequired(), BalValidators.isMinLength(4),  BalValidators.isMaxLength(15), BalValidators.matchesRegex(/^(?=.{4,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/)]),
  });

  constructor(private auth: AuthenticationService) { }

  public onSubmit() {
    this.registerForm.markAllAsTouched();
    if(this.registerForm.valid) {
      this.auth.register(
        this.registerForm.value.username,
        this.registerForm.value.password
      )
      .pipe(
        catchError(error => {
          if(error.status === 409) {
            this.registerForm.get("username")?.setErrors({taken: "Username is already taken"})
          }
          return throwError(() => error);
        })
      )
      .subscribe(elem => {
        console.log(elem)
      });
    }
  }

  submit() {
    this.form.ngSubmit.emit();
  }
}
