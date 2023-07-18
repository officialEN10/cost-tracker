import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alert } from 'src/app/entities/alert';
import { baseURL } from '../../../app/shared/baseurl';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private triggeredAlertsSubject: Subject<Alert[]> = new Subject<Alert[]>();
  public triggeredAlerts$: Observable<Alert[]> =
    this.triggeredAlertsSubject.asObservable();
  private triggeredAlerts: Alert[] = [];

  constructor(private http: HttpClient) {}

  // Function that would check the alerts and decide to trigger or untrigger the alerts
  checkAlerts(alerts: Alert[]): void {
    alerts.forEach((alert) => {
      //if the alert is triggered, we add it to the array
      if (alert.status?.toLocaleLowerCase() === 'triggered') {
        //if it's not already in triggeredAlerts, we add it
        if (!this.triggeredAlerts.find((a) => a.name === alert.name)) {
          this.triggeredAlerts.push(alert);
        }
      }
      //if untriggered, we remove it
      else {
        this.triggeredAlerts = this.triggeredAlerts.filter(
          (a) => a.name !== alert.name
        );
      }
    });
    //we update the observable with the latest changes
    this.triggeredAlertsSubject.next(this.triggeredAlerts);
  }

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

  clear() {
    this.triggeredAlertsSubject.next([]); // to clear toolbars when we logout
  }
}
