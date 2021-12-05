import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { CONSTANTS } from './constants';
import { Role } from './constants/Role';
import JwtToken from './interfaces/JwtToken';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private base: string = CONSTANTS.API_URL;
  private _loggedIn: boolean;
  private _roles: string[] = [];
  public userInfo: any;
  public loggedIn: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private jwt: JwtService,
    private router: Router
  ) {
    this._loggedIn = !!this.jwt.token;
    this.loggedIn.emit(this._loggedIn);
    if(this._loggedIn) {
      this.handleDecodedToken(this.jwt.decodedToken)
    }
    this.jwt.tokenChanged.subscribe((token) => {
      this.setLoggedIn(!!token);
    });
    this.jwt.decodedTokenChanged.subscribe(this.handleDecodedToken.bind(this));
  }

  private handleDecodedToken(decodedToken: JwtToken) {
    this.userInfo = decodedToken ?? {};
    if(decodedToken && decodedToken?.roles) {
        this._roles = decodedToken.roles.split(",").map(elem => elem.trim()) ?? [];
    } else {
      this._roles = [];
    }
  }

  private setLoggedIn(val: boolean) {
    this._loggedIn = val;
    this.loggedIn.emit(val);
  }

  public get isLoggedIn() {
    return this._loggedIn;
  }

  public get isAdmin() {
    return this._roles.indexOf(Role.ADMIN) !== -1;
  }
  public hasRole(role: Role) {
    return this._roles.indexOf(role) !== -1;
  }

  login(username: string, password: string) {
    return this.http
      .post(`${this.base}/login`, { username, password }).pipe(
        tap((data : { access_token?: string }) => {
          if (data.access_token) {
            this.jwt.setToken(data.access_token);
            const queryParams = {
              state: 'logged-in'
            }
            if(this.isAdmin) {
              this.router.navigate(["/admin"], { queryParams });
            } else {
              this.router.navigate(["/restaurants"], { queryParams });
            }
          }
        })
      )
  }

  register(username: string, password: string) {
    return this.http
      .post(`${this.base}/register`, { username, password })
      .pipe(
        catchError(error => {
          return throwError(() => error)
        }),
        tap(data => {
          this.router.navigate(['/login'], { queryParams: { state: 'registered' } });

        })
      );
  }

  logout() {
    this.jwt.setToken('');
    this.router.navigate(['/'], { queryParams: { state: 'logged-out' } });
  }

}
