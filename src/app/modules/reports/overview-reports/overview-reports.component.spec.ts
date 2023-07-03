import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewReportsComponent } from './overview-reports.component';

describe('OverviewReportsComponent', () => {
  let component: OverviewReportsComponent;
  let fixture: ComponentFixture<OverviewReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverviewReportsComponent]
    });
    fixture = TestBed.createComponent(OverviewReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
