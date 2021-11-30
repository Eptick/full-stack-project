import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('login_form') form: NgForm;

  loginForm = new FormGroup({
    username: new FormControl('user'),
    password: new FormControl('user'),
  });

  constructor(private auth: AuthenticationService) { }

  public onSubmit() {
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
