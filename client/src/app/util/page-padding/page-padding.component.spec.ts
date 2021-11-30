import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePaddingComponent } from './page-padding.component';

describe('PagePaddingComponent', () => {
  let component: PagePaddingComponent;
  let fixture: ComponentFixture<PagePaddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagePaddingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePaddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
