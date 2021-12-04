import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminNavigationComponent } from '../admin/admin-navigation/admin-navigation.component';
import { AppComponent } from '../app.component';
import { InAdminSectionDirective } from './in-admin-section.directive';

describe('InAdminSectionDirective', () => {
  let fixture: ComponentFixture<any>;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ AdminNavigationComponent, InAdminSectionDirective ],
      schemas:      [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .createComponent(AdminNavigationComponent);
    fixture.detectChanges(); // initial binding
  });

  it('should have no menu shown', () => {
    const items: HTMLElement[] = fixture.nativeElement.getElementsByTagName('bal-tabs');
    expect(items.length).toBe(0);
  });
});
