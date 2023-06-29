import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCategoriesComponent } from './dynamic-categories.component';

describe('DynamicCategoriesComponent', () => {
  let component: DynamicCategoriesComponent;
  let fixture: ComponentFixture<DynamicCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicCategoriesComponent]
    });
    fixture = TestBed.createComponent(DynamicCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
