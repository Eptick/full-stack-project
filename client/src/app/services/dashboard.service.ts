import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANTS } from '../constants';
import Page from '../interfaces/Page';
import PagingAndSorting from '../model/PagingAndSorting';
import Restaurant from '../model/Restaurant';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private base: string = CONSTANTS.API_URL;

  constructor(private http: HttpClient) {}

  public getRestaurants(params: Partial<PagingAndSorting>): Observable<Partial<Page<Restaurant>>> {
    return this.http.get(`${this.base}/dashboard/restaurants`, { params });
  }
}
