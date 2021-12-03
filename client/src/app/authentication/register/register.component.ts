import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  @ViewChild('register_form') form: NgForm;

  registerForm = new FormGroup({
    username: new FormControl('user'),
    password: new FormControl('user'),
  });
  registerErrorResponse:  HttpErrorResponse | null;

  constructor(private auth: AuthenticationService) { }

  public onSubmit() {
    this.registerForm.markAllAsTouched();
    this.registerErrorResponse = null;
    if(this.registerForm.valid) {
      this.auth.register(
        this.registerForm.value.username,
        this.registerForm.value.password
      )
      .pipe(
        catchError(error => {
          console.log(error)
          this.registerErrorResponse = error;
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
