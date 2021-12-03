import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {

  private _rating: number;

  @Input("readonly") readonly: string;
  @Input("size") size: string = "30px";

  @Output("onSelect") onSelect: EventEmitter<number> = new EventEmitter<number>();

  @Input("rating")
  set rating(val: number | undefined) {
    if(!val) this._rating = 1;
    else {
      this._rating = Math.round(val);
    }
  }

  get rating(): number {
    return this._rating;
  }

  get selectable() {
    return this.readonly === undefined;
  }

  selected(val: number) {
    if(this.selectable) {
      this.onSelect.emit(val);
    }
  }

}
