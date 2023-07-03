import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OverviewReport } from 'src/app/entities/overviewReport';
import { DateService } from 'src/app/services/reports/date/date.service';
import { ReportService } from 'src/app/services/reports/report.service';

@Component({
  selector: 'app-overview-reports',
  templateUrl: './overview-reports.component.html',
  styleUrls: ['./overview-reports.component.scss'],
})
export class OverviewReportsComponent implements OnInit {
  //the filter values
  month: number;
  year: number;

  overviewReports: OverviewReport[];
  displayedColumns: string[] = ['date', 'concept', 'category', 'amount'];

  constructor(
    private dateService: DateService,
    private reportService: ReportService
  ) {}

  ngOnInit() {
    this.dateService.currentDate.subscribe((date) => {
      this.month = date.month;
      this.year = date.year;
      this.getOverviewReports(this.month, this.year);
    });
  }

  getOverviewReports(month: number, year: number): void {
    this.reportService
      .getOverview({ month: month, year: year })
      .subscribe((reports) => {
        this.overviewReports = reports;
        console.log(reports);
      });
  }
}
