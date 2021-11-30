import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from '../constants';
import Restaurant from '../model/Restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private base: string = CONSTANTS.API_URL;

  constructor(private http: HttpClient) { }

  public getRestaurants() {
    return this.http.get(`${this.base}/restaurants`)
  }

  public createRestaurant(restaurant: Restaurant) {
    return this.http
    .post(`${this.base}/restaurants`, restaurant)
  }

  public addReview(content: string, rating: number, restaurant: number) {
    return this.http
    .post(`${this.base}/restaurants/${restaurant}/review`, {
      content,
      rating
    })
  }
}
