import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app.component';
import { InAdminSectionDirective } from './in-admin-section.directive';

describe('IsAdminDirective', () => {
  let fixture: ComponentFixture<any>;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ AppComponent, InAdminSectionDirective ],
      schemas:      [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .createComponent(AppComponent);

    TestBed.inject(HttpClient);
    TestBed.inject(HttpTestingController);

    fixture.detectChanges(); // initial binding
  });

  it('should have 2 menu items', () => {
    const items: HTMLElement[] = fixture.nativeElement.getElementsByTagName('a');
    expect(items.length).toBe(2);
  });
});
