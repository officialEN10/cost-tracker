import { Component, Input, OnInit } from '@angular/core';
import { AlertsReport } from 'src/app/entities/alertsReport';
import { DateService } from 'src/app/services/reports/date/date.service';
import { ReportService } from 'src/app/services/reports/report.service';

@Component({
  selector: 'app-alerts-reports',
  templateUrl: './alerts-reports.component.html',
  styleUrls: ['./alerts-reports.component.scss'],
})
export class AlertsReportsComponent implements OnInit {
  @Input() useCurrentDate: boolean = false; // we use it in the dashboard
  alertReports: AlertsReport[];

  //the filter values
  month: number;
  year: number;
  error: string;

  displayedColumns: string[] = [
    'alert',
    'category',
    'condition',
    'status',
    'date',
  ];

  emptyMessage: string;

  constructor(
    private dateService: DateService,
    private reportService: ReportService
  ) {}

  ngOnInit() {
    if (this.useCurrentDate) {
      this.getCurrentMonthYearReport();
    } else {
      this.getReportsBasedOnSelectedDate();
    }
  }

  getCurrentMonthYearReport(): void {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    this.getAlertsReport(month, year);
  }

  getReportsBasedOnSelectedDate() {
    this.dateService.currentDate.subscribe((date) => {
      this.month = date.month;
      this.year = date.year;
      this.getAlertsReport(this.month, this.year);
    });
  }

  getAlertsReport(month: number, year: number): void {
    this.reportService.getAlerts({ month: month, year: year }).subscribe(
      (reports) => {
        this.alertReports = reports;
        if (this.alertReports.length == 0) {
          //if the user has no reports, i show a message that the user doesn't have reports for the selected month
          this.emptyMessage =
            "You don't have any reports for the selected month.";
        } else {
          this.emptyMessage = '';
        }
      },
      (error) => {
        this.error = 'Error: ' + error.error.message + '';
        console.error(error);
      }
    );
  }
}
