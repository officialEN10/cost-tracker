import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alert } from 'src/app/entities/alert';
import { baseURL } from '../../../app/shared/baseurl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private http: HttpClient) {}

  createAlert(newAlert: Alert): Observable<Alert> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.post<Alert>(baseURL + 'alert', newAlert, httpOptions);
  }

  getAlert(id: string): Observable<Alert> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.get<Alert>(baseURL + 'alert/' + id, httpOptions);
  }

  updateAlert(id: string, updatedAlert: Alert): Observable<Alert> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.put<Alert>(
      baseURL + 'alert/' + id,
      updatedAlert,
      httpOptions
    );
  }

  deleteAlert(id: string): Observable<Alert> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.delete<Alert>(baseURL + 'alert/' + id, httpOptions);
  }
}
