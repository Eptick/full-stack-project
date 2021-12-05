import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BalSelect } from '@baloise/design-system-components-angular';
import { BalValidators } from '@baloise/web-app-validators-angular';
import { catchError, finalize, throwError } from 'rxjs';
import User from 'src/app/model/User';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
import { UserService } from 'src/app/services/user.service';
import { PasswordValidations, RolesValidations, UsernameValidations } from 'src/app/util/project-validations';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  @ViewChild('f') f: NgForm;
  @ViewChild("roleSelector") select: BalSelect;

  private userId: number;
  public user: User;

  initialLoading: boolean = false;
  loading: boolean = false;
  form = new FormGroup({
    username: new FormControl(null, UsernameValidations),
    password: new FormControl(null, [BalValidators.isMinLength(4)]), // when editing don't require the password
    roles: new FormControl(null, RolesValidations),
  })
  constructor(
    private errorHandling: ErrorHandlingService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    const id = this.route.snapshot.paramMap.get('id')
    if(id) {
      this.userId = parseInt(id as string);
    } else {
      this.router.navigate(["/admin/users"]);
    }
  }


  ngOnInit() {
    this.initialLoading = true;
    this.userService.getUser(this.userId).pipe(
      catchError(error => {
        if(error.status === 404) {
          this.router.navigate(["/admin/users"], { queryParams: {state: 'not-found'}});
        } else {
          this.errorHandling.handleHttpError(error)
        }
        return throwError(() => error);
      }),
      finalize(() => {
        this.initialLoading = false;
      })
    ).subscribe(data => {
      this.user = data as User;
      this.form.patchValue({
        ...this.user,
        roles: [...this.user.roleList]
      });
    })
  }



  onSubmit() {
    this.form.markAllAsTouched();
    this.form.markAsDirty();
    if(this.form.valid) {
      this.loading = true;
      this.userService.updateUser({
          id: this.userId,
          ...this.form.value
        }).pipe(
        catchError(error => {
          try {
            if(error.status === 409) {
              this.form.get("username")?.setErrors({
                taken: true
              })
            } else {
              this.errorHandling.handleHttpError(error)
            }
          } catch (error) {
            console.error(error)
          }
          return throwError(() => error);
        }),
        finalize(() => {
          this.loading = false;
        })
      ).subscribe(data => {
        this.router.navigate(["/admin/users"], {queryParams: {state: 'updated'}})
      })
    }
  }

  submit() {
    this.f.ngSubmit.emit();
  }
}
