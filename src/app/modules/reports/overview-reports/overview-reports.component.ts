import { Component, OnInit } from '@angular/core';
import { OverviewReport } from 'src/app/entities/overviewReport';
import { DateService } from 'src/app/services/reports/date/date.service';
import { ReportService } from 'src/app/services/reports/report.service';
import * as Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsData from 'highcharts/modules/data';
import HighchartsAccessibility from 'highcharts/modules/accessibility';

HighchartsExporting(Highcharts);
HighchartsData(Highcharts);
HighchartsAccessibility(Highcharts);

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

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  chartDataLoaded: boolean = false;

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

        // Prepare the data for chart
        const charData = this.prepareChartData(reports);

        console.log('chartData: ', charData);

        // Update the chartOptions
        this.chartOptions = {
          ...this.chartOptions,
          accessibility: {
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
      });
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
}
