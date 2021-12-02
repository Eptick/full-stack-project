import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from '../constants';
import Review, { ReviewDto } from '../model/Review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private base: string = CONSTANTS.API_URL;

  constructor(private http: HttpClient) { }

  public getReviews(page: number = 0) {
    return this.http.get(`${this.base}/reviews`, { params: { page }})
  }
  public getReview(reviewId: number) {
    return this.http.get(`${this.base}/reviews/${reviewId}`)
  }
  public deleteReview(reviewId: number) {
    return this.http
    .delete(`${this.base}/reviews/${reviewId}`)
  }
  public updateReview(dto: ReviewDto) {
    return this.http
    .patch(`${this.base}/reviews/${dto.id}`, dto)
  }
  public deleteReviews(reviewIds: number[]) {
    return this.http
    .delete(`${this.base}/reviews`, {body: {ids: reviewIds}} )
  }
}
