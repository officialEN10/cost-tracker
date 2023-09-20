import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsToolbarComponent } from './alerts-toolbar.component';

describe('AlertsToolbarComponent', () => {
  let component: AlertsToolbarComponent;
  let fixture: ComponentFixture<AlertsToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertsToolbarComponent]
    });
    fixture = TestBed.createComponent(AlertsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
