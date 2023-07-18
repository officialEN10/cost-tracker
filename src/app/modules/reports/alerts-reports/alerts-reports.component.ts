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
  @Input() alertReports: AlertsReport[];

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

  constructor(
    private dateService: DateService,
    private reportService: ReportService
  ) {}

  ngOnInit() {
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
        console.log(reports);
      },
      (error) => {
        this.error =
          'Error: ' + error.error.message +'';
        console.error(error);
      }
    );
  }
}
