import { Component } from '@angular/core';
import { StatusToastService } from './services/status-toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(statusToastService: StatusToastService){}
}
