import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsReportsComponent } from './alerts-reports.component';

describe('AlertsReportsComponent', () => {
  let component: AlertsReportsComponent;
  let fixture: ComponentFixture<AlertsReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertsReportsComponent]
    });
    fixture = TestBed.createComponent(AlertsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
