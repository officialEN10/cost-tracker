import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsParentComponent } from './reports-parent.component';

describe('ReportsParentComponent', () => {
  let component: ReportsParentComponent;
  let fixture: ComponentFixture<ReportsParentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportsParentComponent]
    });
    fixture = TestBed.createComponent(ReportsParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
