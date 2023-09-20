import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesPieChartComponent } from './categories-pie-chart.component';

describe('CategoriesPieChartComponent', () => {
  let component: CategoriesPieChartComponent;
  let fixture: ComponentFixture<CategoriesPieChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesPieChartComponent]
    });
    fixture = TestBed.createComponent(CategoriesPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
