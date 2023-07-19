import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsData from 'highcharts/modules/data';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import { CategoriesReport } from 'src/app/entities/categoriesReport';

HighchartsExporting(Highcharts);
HighchartsData(Highcharts);
HighchartsAccessibility(Highcharts);

@Component({
  selector: 'app-categories-pie-chart',
  templateUrl: './categories-pie-chart.component.html',
  styleUrls: ['./categories-pie-chart.component.scss'],
})
export class CategoriesPieChartComponent implements OnChanges {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  @Input() categoriesReports: CategoriesReport[];
  chartDataLoaded: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['categoriesReports'] &&
      changes['categoriesReports'].currentValue
    ) {
      // Prepare the data for chart
      const charData = this.prepareChartData(this.categoriesReports);

      console.log('chartData: ', charData);

      // Update the chartOptions
      this.chartOptions = {
        chart: {
          plotShadow: false,
          type: 'pie',
        },
        credits: {
          enabled: false,
        },
        title: {
          text: 'Categories Report',
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        accessibility: {
          point: {
            valueSuffix: '%',
          },
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            },
          },
        },
        series: [
          {
            type: 'pie',
            name: 'Categories',
            data: charData.seriesData,
          },
        ],
      };
      // Indicate that data is loaded and chart can be rendered
      this.chartDataLoaded = true;
    }
  }

  prepareChartData(reports: CategoriesReport[]) {
    let seriesData = reports.map((item) => {
      return {
        name: item.category,
        y: item.totalAmount,
      };
    });

    return { seriesData };
  }
}
