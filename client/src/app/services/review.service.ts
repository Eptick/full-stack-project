import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from '../constants';
import Review from '../model/Review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private base: string = CONSTANTS.API_URL;

  constructor(private http: HttpClient) { }

  public getReviews() {
    return this.http.get(`${this.base}/reviews`)
  }
}
