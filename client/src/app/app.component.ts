import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StatusToastService } from './services/status-toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(statusToastService: StatusToastService, private router: Router){}

  home(e: MouseEvent) {
    e.preventDefault();
    this.router.navigate(["/"]);
  }
}
