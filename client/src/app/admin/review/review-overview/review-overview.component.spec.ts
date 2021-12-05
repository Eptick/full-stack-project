import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular';

import { ReviewOverviewComponent } from './review-overview.component';

describe('ReviewOverviewComponent', () => {
  let component: ReviewOverviewComponent;
  let fixture: ComponentFixture<ReviewOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BaloiseDesignSystemModule,
        RouterTestingModule,
      ],
      declarations: [ ReviewOverviewComponent ]
    })
    .compileComponents();

    TestBed.inject(HttpClient);
    TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
