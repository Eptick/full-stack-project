import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { BalValidators } from '@baloise/web-app-validators-angular';
import { catchError, EMPTY, } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('login_form') form: NgForm;

  loginForm = new FormGroup({
    username: new FormControl('', [BalValidators.isRequired()]),
    password: new FormControl('', [BalValidators.isRequired()]),
  });

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.loginForm.controls['password']?.valueChanges.subscribe(() => {
      if(this.loginForm.controls['username'].hasError('invalid'))
        this.loginForm.controls['username'].setErrors(null);
    })
  }

  public onSubmit() {
    this.loginForm.markAllAsTouched();
    if(this.loginForm.valid) {
      this.auth.login(
        this.loginForm.value.username,
        this.loginForm.value.password
      ).pipe(
        catchError((error) => {
        if(error.status === 401) {
          this.loginForm.get("username")?.setErrors({'invalid': true});
        }
        return EMPTY
      }))
      .subscribe(() => {})
    }
  }

  submit() {
    this.form.ngSubmit.emit();
  }

}
