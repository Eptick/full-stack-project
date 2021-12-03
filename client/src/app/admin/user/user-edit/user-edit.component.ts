import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BalSelect } from '@baloise/design-system-components-angular';
import { catchError, finalize, throwError } from 'rxjs';
import User from 'src/app/model/User';
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
    password: new FormControl(null, PasswordValidations),
    roles: new FormControl(null, RolesValidations),
  })
  constructor(
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
    if(this.form.valid) {
      this.loading = true;
      this.form.disable();
      this.userService.updateUser({
          id: this.userId,
          ...this.form.value
        }).pipe(
        catchError(error => {
          return throwError(() => error);
        }),
        finalize(() => {
          this.form.enable();
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