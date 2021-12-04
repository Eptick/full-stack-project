import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular';

import { UserBackComponent } from './user-back.component';

describe('UserBackComponent', () => {
  let component: UserBackComponent;
  let fixture: ComponentFixture<UserBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaloiseDesignSystemModule, RouterTestingModule],
      declarations: [ UserBackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
