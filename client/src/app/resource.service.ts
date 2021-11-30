import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from './constants';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private base: string = CONSTANTS.API_URL;

  constructor(private http: HttpClient) { }

  public getResource() {
    return this.http.get(`${this.base}/resource`);
  }
}
