import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AdminOverviewService {

  private base: string = CONSTANTS.API_URL;

  constructor(private http: HttpClient) { }

  public getOverview(): Observable<Partial<any>> {
    return this.http.get(`${this.base}/admin/overview`);
  }
}
