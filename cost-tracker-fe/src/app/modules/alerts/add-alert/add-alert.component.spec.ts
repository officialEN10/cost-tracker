import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlertComponent } from './add-alert.component';

describe('AddAlertComponent', () => {
  let component: AddAlertComponent;
  let fixture: ComponentFixture<AddAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAlertComponent]
    });
    fixture = TestBed.createComponent(AddAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
