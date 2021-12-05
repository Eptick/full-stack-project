import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import Restaurant from 'src/app/model/Restaurant';
import { AdminOverviewService } from 'src/app/services/admin-overview.service';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';

interface AdminOverview {
  numberOfRestaurants: number;
  numberOfReviews: number;
  numberOfUsers: number;
  averageReview: number;
  highestRatedRestaurant: Restaurant;
  lowestRatedRestaurant: Restaurant;
}

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss']
})
export class AdminOverviewComponent implements OnInit {
  overviewData: AdminOverview;

  constructor(
    private errorHandlingService: ErrorHandlingService,
    private adminOverviewService: AdminOverviewService
  ) { }

  ngOnInit(): void {
    this.adminOverviewService.getOverview().pipe(
      catchError((error) => {
        this.errorHandlingService.handleHttpError(error)
        return EMPTY;
      })
    ).subscribe((data: Partial<AdminOverview>) => {
      this.overviewData = data as AdminOverview;
    })
  }

}
