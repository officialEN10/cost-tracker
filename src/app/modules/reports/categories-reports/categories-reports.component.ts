import { Component, OnInit } from '@angular/core';
import { CategoriesReport } from 'src/app/entities/categoriesReport';
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
  selector: 'app-categories-reports',
  templateUrl: './categories-reports.component.html',
  styleUrls: ['./categories-reports.component.scss'],
})
export class CategoriesReportsComponent implements OnInit {
  //the filter values
  month: number;
  year: number;

  categoriesReports: CategoriesReport[];
  displayedColumns: string[] = [
    'category',
    'total amount',
    'minimum value',
    'maximum value',
    'status',
  ];

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
      this.getCategoriesReport(this.month, this.year);
    });
  }

  getCategoriesReport(month: number, year: number): void {
    this.reportService
      .getCategories({ month: month, year: year })
      .subscribe((reports) => {
        this.categoriesReports = reports;
        console.log(reports);
        // Prepare the data for chart
        const charData = this.prepareChartData(reports);

        console.log('chartData: ', charData);

        // Update the chartOptions
        this.chartOptions = {
          chart: {
              plotShadow: false,
              type: 'pie'
          },
          title: {
              text: 'Categories Report'
          },
          tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          accessibility: {
              point: {
                  valueSuffix: '%'
              }
          },
          plotOptions: {
              pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                      enabled: true,
                      format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                  }
              }
          },
          series: [{
              type: 'pie',
              name: 'Categories',
              data: charData.seriesData
          }]
      };

      // Indicate that data is loaded and chart can be rendered
      this.chartDataLoaded = true;
  });
}



  prepareChartData(reports: CategoriesReport[]) {
    let seriesData = reports.map((item) => {
        return {
            name: item.category,
            y: item.totalAmount
        };
    });

    return { seriesData };
}

}
