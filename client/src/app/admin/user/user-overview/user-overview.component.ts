import { Component, OnInit } from '@angular/core';
import { catchError, finalize } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
import Page from 'src/app/interfaces/Page';
import User from 'src/app/model/User';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss'],
})
export class UserOverviewComponent implements OnInit {
  public loading: boolean = true;
  page: number = 0;
  public users: Page<User>;

  constructor(
    private errorHandling: ErrorHandlingService,
    public auth: AuthenticationService,
    private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(page = 0) {
    this.page = page;
    this.userService
      .getUsers(page)
      .pipe(
        catchError((error, caught) => {
          this.errorHandling.handleHttpError(error)
          return caught;
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((data) => {
        this.users = data as Page<User>;
        if (this.users.empty && this.users.pageable.pageNumber > 0) {
          this.getUsers(--page);
        }
      });
  }

  public deleteUser(userId: number) {
    this.userService
      .deleteUser(userId)
      .pipe(
        catchError((error, caught) => {
          this.errorHandling.handleHttpError(error);
          return caught;
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((data) => {
        this.getUsers(this.page);
      });
  }
}
