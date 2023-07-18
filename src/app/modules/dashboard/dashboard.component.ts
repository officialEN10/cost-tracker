import { Component, OnInit } from '@angular/core';
import { AlertsReport } from 'src/app/entities/alertsReport';
import { CategoriesReport } from 'src/app/entities/categoriesReport';
import { OverviewReport } from 'src/app/entities/overviewReport';
import { ReportService } from 'src/app/services/reports/report.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  overviewReports: OverviewReport[];
  categoriesReports: CategoriesReport[];
  alertReports: AlertsReport[];

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    this.reportService
      .getOverview({ month: month, year: year })
      .subscribe((reports) => {
        this.overviewReports = reports;
      });

    this.reportService
      .getCategories({ month: month, year: year })
      .subscribe((reports) => (this.categoriesReports = reports));

    this.reportService
      .getAlerts({ month: month, year: year })
      .subscribe((reports) => {
        // we only keep the first 5 alerts
        this.alertReports = reports.slice(0, 5);
      });
  }
}
