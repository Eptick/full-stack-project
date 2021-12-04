import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular';
import { PagePaddingComponent } from 'src/app/util/page-padding/page-padding.component';

import { RestaurantListPageComponent } from './restaurant-list-page.component';

describe('RestaurantListPageComponent', () => {
  let component: RestaurantListPageComponent;
  let fixture: ComponentFixture<RestaurantListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        BaloiseDesignSystemModule,
      ],
      declarations: [ RestaurantListPageComponent, PagePaddingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
