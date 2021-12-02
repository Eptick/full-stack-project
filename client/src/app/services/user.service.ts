import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANTS } from '../constants';
import Page from '../interfaces/Page';
import User from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private base: string = CONSTANTS.API_URL;

  constructor(private http: HttpClient) { }

  public getUsers(page: number = 0, query: string = ""): Observable<Partial<Page<User>>> {
    return this.http.get(`${this.base}/users`, {params: { page, query }})
  }
}
