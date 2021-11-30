import { EventEmitter, Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import JwtToken from './interfaces/JwtToken';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private _token: string
  private _decoded_token: JwtToken;
  public tokenChanged: EventEmitter<string> = new EventEmitter();
  public decodedTokenChanged: EventEmitter<object> = new EventEmitter();

  constructor() {
    this.tokenChanged.subscribe(data => this.setDecodedToken(data));
    this.loadToken();
  }

  private loadToken() {
    const local = localStorage.getItem("access_token");
    if(local) {
      this.setToken(local);
    }
  }

  public setToken(token: string) {
    localStorage.setItem("access_token", token);
    this._token = token;
    this.tokenChanged.emit(token);
  }

  public get token() {
    return this._token;
  }

  private setDecodedToken(token: string) {
    try {
      const decoded: JwtToken = jwt_decode(token);
      this._decoded_token = decoded;
      this.decodedTokenChanged.emit(decoded);
    } catch (error) {
      this.decodedTokenChanged.emit({});
    }
  }

  public get decodedToken() {
    return this._decoded_token;
  }

}
