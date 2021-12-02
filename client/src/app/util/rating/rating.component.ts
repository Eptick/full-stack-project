import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {

  @Input("readonly") readonly: string;
  @Input("rating") rating: number = 1;

  @Output("onSelect") onSelect: EventEmitter<number> = new EventEmitter<number>();

  get selectable() {
    return this.readonly === undefined;
  }

  selected(val: number) {
    if(this.selectable) {
      this.onSelect.emit(val);
    }
  }

}
