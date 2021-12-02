import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANTS } from '../constants';
import Page from '../interfaces/Page';
import Restaurant from '../model/Restaurant';
import Review, { ReviewDto } from '../model/Review';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private base: string = CONSTANTS.API_URL;

  constructor(private http: HttpClient) { }

  public getRestaurants(page: number = 0, query: string = ""): Observable<Partial<Page<Restaurant>>> {
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
  public addReview(dto: Partial<ReviewDto>) {
    return this.http
    .post(`${this.base}/restaurants/${dto.restaurantId}/review`, dto)
  }
}
