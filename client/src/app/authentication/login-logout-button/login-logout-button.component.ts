import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-login-logout-button',
  templateUrl: './login-logout-button.component.html',
  styleUrls: ['./login-logout-button.component.scss']
})
export class LoginLogoutButtonComponent {
  loggedIn: boolean = false;

  constructor(private auth: AuthenticationService) {
    this.loggedIn = auth.isLoggedIn;
    auth.loggedIn.subscribe(data => this.loggedIn = data);
  }

  logout() {
    this.auth.logout();
  }

}
