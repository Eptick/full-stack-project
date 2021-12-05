import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, finalize } from 'rxjs';
import Page from 'src/app/interfaces/Page';
import Review from 'src/app/model/Review';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
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

  constructor(
    private errorHandling: ErrorHandlingService,
    private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.getReviews();
  }

  public getReviews(page = 0) {
    this.page = page;
    this.reviewService.getReviews(page).pipe(
      catchError((error) => {
        this.errorHandling.handleHttpError(error);
        return EMPTY;
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((data) => {
      this.reviews = data as Page<Review>;
      if(this.reviews.empty && this.reviews.pageable.pageNumber > 0) {
        this.getReviews(--page);
      }
    })
  }

  public deleteReview(reviewId: number) {
    this.reviewService.deleteReview(reviewId).pipe(
      catchError((error) => {
        this.errorHandling.handleHttpError(error);
        return EMPTY;
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((data) => {
      this.getReviews(this.page)
    })
  }
}
