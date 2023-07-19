import { Component, OnInit } from '@angular/core';
import { CategoriesReport } from 'src/app/entities/categoriesReport';
import { DateService } from 'src/app/services/reports/date/date.service';
import { ReportService } from 'src/app/services/reports/report.service';
@Component({
  selector: 'app-categories-reports',
  templateUrl: './categories-reports.component.html',
  styleUrls: ['./categories-reports.component.scss'],
})
export class CategoriesReportsComponent implements OnInit {
  //the filter values
  month: number;
  year: number;
  error: string;

  categoriesReports: CategoriesReport[];
  displayedColumns: string[] = [
    'category',
    'total amount',
    'minimum value',
    'maximum value',
    'status',
  ];

  emptyMessage: string;

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
    this.reportService.getCategories({ month: month, year: year }).subscribe(
      (reports) => {
        this.categoriesReports = reports;
        if (this.categoriesReports.length == 0) {
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
