import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BalToastOptions } from '@baloise/design-system-components';
import { BalToastService } from '@baloise/design-system-components-angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(private toast: BalToastService) { }

  handleHttpError(error: HttpErrorResponse) {
    try {
      if(error.status >= 500 && error.status <=599) {
        this.createToast({message: 'Something went wrong on our servers, try again later', color: 'danger'})
      } else if(error.status === 401) {
        this.createToast({message: 'Authenitcation failed, please login', color: 'info'})
      } else if(error.status === 400) {
        this.createToast({message: 'Invalid data', color: 'danger'})
      } else if(error.status === 404) {
        this.createToast({message: 'That was not found', color: 'danger'})
      }
    } catch (error) {
      console.error(error);
    }
  }

  createToast(config: BalToastOptions) {
    this.toast.create({
      duration: 2500,
      ...config
    })
  }
}
