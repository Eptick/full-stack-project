import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { BalValidators } from '@baloise/web-app-validators-angular';
import { catchError, } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('login_form') form: NgForm;

  loginForm = new FormGroup({
    username: new FormControl('', [BalValidators.isRequired()]),
    password: new FormControl('', [BalValidators.isRequired()]),
  });

  constructor(private auth: AuthenticationService) { }

  public onSubmit() {
    this.loginForm.markAllAsTouched();
    if(this.loginForm.valid) {
      this.auth.login(
        this.loginForm.value.username,
        this.loginForm.value.password
      ).pipe(
        catchError((error, caught) => {
        if(error.status === 401) {
          this.loginForm.get("username")?.setErrors({'invalid': true});
        }
        return caught
      }))
      .subscribe(() => {})
    }
  }

  submit() {
    this.form.ngSubmit.emit();
  }

}
