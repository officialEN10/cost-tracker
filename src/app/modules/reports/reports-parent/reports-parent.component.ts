import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { DateService } from 'src/app/services/reports/date/date.service';

@Component({
  selector: 'app-reports-parent',
  templateUrl: './reports-parent.component.html',
  styleUrls: ['./reports-parent.component.scss'],
})
export class ReportsParentComponent implements OnInit {
  reportFrom: FormGroup;
  //the filter values
  month: number;
  year: number;

  constructor(
    private router: Router,
    private dateService: DateService,
    private fb: FormBuilder
  ) {
    const currentDate = new Date();
    //we get the current month/year
    this.dateService.currentDate.subscribe((date) => {
      this.month = date.month;
      this.year = date.year;
    });

    this.reportFrom = this.fb.group({
      //we set the select date to current month and year incase observer is null and date
      month: [
        // new Date().getMonth() + 1,
        this.month,
        [Validators.required, Validators.min(1), Validators.max(12)],
      ],
      year: [
        // new Date().getFullYear(),
        this.year,
        [
          Validators.required,
          Validators.min(2000),
          Validators.max(currentDate.getFullYear()),
        ],
      ],
    });
  }
  ngOnInit(): void {}

  onTabChange(event: MatTabChangeEvent) {
    switch (event.index) {
      case 0:
        this.router.navigate(['reports/categories-reports']);
        break;
      case 1:
        this.router.navigate(['reports/overview-reports']);
        break;
      case 2:
        this.router.navigate(['reports/alerts-reports']);
        break;
    }
  }

  onSubmit() {
    if (this.reportFrom.valid) {
      this.dateService.updateDate(
        this.reportFrom.value.month,
        this.reportFrom.value.year
      );
    }
  }
}
