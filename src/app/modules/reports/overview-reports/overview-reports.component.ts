import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { OverviewReport } from 'src/app/entities/overviewReport';
import { DateService } from 'src/app/services/reports/date/date.service';
import { ReportService } from 'src/app/services/reports/report.service';
import * as Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsData from 'highcharts/modules/data';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import { Subject, takeUntil } from 'rxjs';

HighchartsExporting(Highcharts);
HighchartsData(Highcharts);
HighchartsAccessibility(Highcharts);

@Component({
  selector: 'app-overview-reports',
  templateUrl: './overview-reports.component.html',
  styleUrls: ['./overview-reports.component.scss'],
})
// export class OverviewReportsComponent implements OnInit, OnChanges, OnDestroy {
export class OverviewReportsComponent implements OnInit, OnDestroy {
  @Input() useCurrentDate: boolean = false; // we use it in the dashboard
  overviewReports: OverviewReport[] = [];

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  chartDataLoaded: boolean = false;
  private unsubscribe$ = new Subject<void>(); //to unsubscribe

  //the filter values
  month: number;
  year: number;
  error: string;

  displayedColumns: string[] = ['date', 'concept', 'category', 'amount'];

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

  getReportsBasedOnSelectedDate() {
    this.dateService.currentDate
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((date) => {
        this.month = date.month;
        this.year = date.year;
        this.getOverviewReports(this.month, this.year);
      });
  }

  getCurrentMonthYearReport(): void {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    this.getOverviewReports(month, year);
  }

  getOverviewReports(month: number, year: number): void {
    this.reportService
      .getOverview({ month: month, year: year })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (reports) => {
          this.overviewReports = reports;
          if (this.overviewReports.length == 0) {
            //if the user has no reports, i show a message that the user doesn't have reports for the selected month
            this.emptyMessage =
              "You don't have any reports for the selected month.";
          } else {
            this.emptyMessage = '';
            // Prepare the data for chart
            const charData = this.prepareChartData(reports);

            console.log('chartData: ', charData);

            // Update the chartOptions
            this.chartOptions = {
              accessibility: {
                enabled: false,
              },
              credits: {
                enabled: false,
              },
              chart: {
                type: 'column',
              },
              title: {
                text: 'Overview Report',
              },
              xAxis: {
                categories: charData.categories,
                crosshair: true,
              },
              yAxis: {
                min: 0,
                title: {
                  text: 'Amount',
                },
              },
              plotOptions: {
                column: {
                  stacking: 'normal',
                },
              },
              series: charData.series,
            };
            this.chartDataLoaded = true; //we dont renderit untill all the info is there
          }
        },
        (error) => {
          this.error = 'Error: ' + error.error.message + '';
          console.error(error);
        }
      );
  }

  prepareChartData(reports: OverviewReport[]) {
    let categories = [...new Set(reports.map((item) => item.category))];
    // console.log('categories:', categories);

    let series: Highcharts.SeriesColumnOptions[] = categories.map(
      (category, index) => {
        // Added index
        let data = reports
          .filter((item) => item.category === category)
          .map((item) => [index, item.totalAmount]); // we associate data with category index
        return {
          type: 'column',
          name: category,
          data: data,
        };
      }
    );

    // console.log('series: ', series);
    return { categories, series };
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
