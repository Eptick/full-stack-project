import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { BalValidators } from '@baloise/web-app-validators-angular';
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
      );
    }
  }

  submit() {
    this.form.ngSubmit.emit();
  }

}
