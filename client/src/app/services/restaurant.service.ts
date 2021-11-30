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

  public getRestaurants(page: number = 0) {
    return this.http.get(`${this.base}/restaurants`, {params: { page }})
  }

  public createRestaurant(restaurant: Partial<Restaurant>) {
    return this.http
    .post(`${this.base}/restaurants`, restaurant)
  }
  public deleteRestaurant(restaurantId: number) {
    return this.http
    .delete(`${this.base}/restaurants/${restaurantId}`)
  }
  public deleteRestaurants(restaurantIds: number[]) {
    return this.http
    .delete(`${this.base}/restaurants/`, {body: {ids: restaurantIds}} )
  }
  public addReview(content: string, rating: number, restaurant: number) {
    return this.http
    .post(`${this.base}/restaurants/${restaurant}/review`, {
      content,
      rating
    })
  }
}
