import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { catchError } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
import { PasswordValidations, UsernameValidations } from 'src/app/util/project-validations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  @ViewChild('register_form') form: NgForm;

  registerForm = new FormGroup({
    username: new FormControl('', UsernameValidations),
    password: new FormControl('', PasswordValidations),
  });

  constructor(
    private errorHandling: ErrorHandlingService,
    private auth: AuthenticationService
    ) { }

  public onSubmit() {
    this.registerForm.markAllAsTouched();
    if(this.registerForm.valid) {
      this.auth.register(
        this.registerForm.value.username,
        this.registerForm.value.password
      )
      .pipe(
        catchError((error, caught) => {
          if(error.status === 409) {
            this.registerForm.get("username")?.setErrors({taken: "Username is already taken"})
          } else {
            this.errorHandling.handleHttpError(error);
          }
          return caught;
        })
      )
      .subscribe(elem => { }); // triger the request
    }
  }

  submit() {
    this.form.ngSubmit.emit();
  }
}
