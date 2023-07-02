import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyAlertComponent } from './modify-alert.component';

describe('ModifyAlertComponent', () => {
  let component: ModifyAlertComponent;
  let fixture: ComponentFixture<ModifyAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyAlertComponent]
    });
    fixture = TestBed.createComponent(ModifyAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
