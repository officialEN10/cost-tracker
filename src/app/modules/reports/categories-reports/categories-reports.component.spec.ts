import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesReportsComponent } from './categories-reports.component';

describe('CategoriesReportsComponent', () => {
  let component: CategoriesReportsComponent;
  let fixture: ComponentFixture<CategoriesReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesReportsComponent]
    });
    fixture = TestBed.createComponent(CategoriesReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
