import { Component, OnInit } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import Page from 'src/app/interfaces/Page';
import Review from 'src/app/model/Review';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review-overview',
  templateUrl: './review-overview.component.html',
  styleUrls: ['./review-overview.component.scss']
})
export class ReviewOverviewComponent implements OnInit {


  public loading: boolean = true;
  page: number = 10;
  public reviews: Page<Review>;
  public selected: number[] = [];

  constructor(private reviewService: ReviewService) {

  }

  ngOnInit(): void {
    this.getReviews();
  }

  toggleSelected(reviewId: number, checked: boolean) {
    if(checked) {
      this.selected.push(reviewId);
    } else {
      this.selected = this.selected.filter(elem => elem !== reviewId);
    }
  }

  bulkDelete() {
    this.reviewService.deleteReviews(this.selected).pipe(
      catchError(error => {
        return throwError(() => error);
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe(() => {
      this.getReviews();
    })
  }

  public getReviews(page = 0) {
    this.page = page;
    this.reviewService.getReviews(page).pipe(
      catchError(error => {
        return throwError(() => error);
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((data) => {
      this.selected= [];
      this.reviews = data as Page<Review>;
      if(this.reviews.empty && this.reviews.pageable.pageNumber > 0) {
        this.getReviews(--page);
      }
    })
  }

  public deleteReview(reviewId: number) {
    this.reviewService.deleteReview(reviewId).pipe(
      catchError(error => {
        return throwError(() => error);
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((data) => {
      this.getReviews(this.page)
    })
  }
}
