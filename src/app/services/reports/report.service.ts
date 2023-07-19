import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseURL } from '../../../app/shared/baseurl';
import { Report } from 'src/app/entities/report';
import { OverviewReport } from 'src/app/entities/overviewReport';
import { CategoriesReport } from 'src/app/entities/categoriesReport';
import { AlertsReport } from 'src/app/entities/alertsReport';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  getOverview(report: Report): Observable<OverviewReport[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
      params: this.createHttpParams(report),
    };

    console.log('reports: ', report);
    return this.http.get<OverviewReport[]>(
      baseURL + 'report/overview',
      httpOptions
    );
  }

  getCategories(report: Report): Observable<CategoriesReport[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
      params: this.createHttpParams(report),
    };

    return this.http.get<CategoriesReport[]>(
      baseURL + 'report/categories',
      httpOptions
    );
  }

  getAlerts(report: Report): Observable<AlertsReport[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
      params: this.createHttpParams(report),
    };

    return this.http.get<AlertsReport[]>(
      baseURL + 'report/alerts',
      httpOptions
    );
  }

  //a function the converts the report to httpParams so we can
  //send it along side the req header, cuz we can't send it as a body
  //because it is a get request
  private createHttpParams(report: Report): HttpParams {
    return new HttpParams()
      .set('month', report.month.toString())
      .set('year', report.year.toString());
  }
}
