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

  public getRestaurants(page: number = 0, query: string = "") {
    return this.http.get(`${this.base}/restaurants`, {params: { page, query }})
  }

  public getRestaurant(restaurantId: number) {
    return this.http.get(`${this.base}/restaurants/${restaurantId}`);
  }

  public createRestaurant(restaurant: Partial<Restaurant>) {
    return this.http
    .post(`${this.base}/restaurants`, restaurant)
  }
  public updateRestaurant(restaurant: Partial<Restaurant>) {
    if(!restaurant.id) throw new Error("No id");
    return this.http
    .patch(`${this.base}/restaurants/${restaurant.id}`, restaurant)
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
