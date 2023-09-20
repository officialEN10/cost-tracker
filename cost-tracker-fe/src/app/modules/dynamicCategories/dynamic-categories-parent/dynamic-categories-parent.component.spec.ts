import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCategoriesParentComponent } from './dynamic-categories-parent.component';

describe('DynamicCategoriesParentComponent', () => {
  let component: DynamicCategoriesParentComponent;
  let fixture: ComponentFixture<DynamicCategoriesParentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicCategoriesParentComponent]
    });
    fixture = TestBed.createComponent(DynamicCategoriesParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
