import { Component, OnInit } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  restaurantsLoading = true;
  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit() {
    this.getRestaurants()
  }

  private getRestaurants() {
    const params: any = {
      page: 0,
      limit: 6,
      size: 6,
    }
    this.restaurantsLoading = true;
    this.dashboardService.getRestaurants(params).pipe(
      catchError(error => {
        return throwError(() => error);
      }),
      finalize(() => {
        this.restaurantsLoading = false;
      })
    ).subscribe(data => {
      console.log(data);
    })
  }
}
