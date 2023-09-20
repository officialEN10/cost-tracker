import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Expense } from 'src/app/entities/expense';

import { baseURL } from '../../../app/shared/baseurl';
import { AlertService } from '../alert/alert.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private userService: UserService
  ) {}

  createExpense(newExpense: FormData): Observable<Expense> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http
      .post<Expense>(baseURL + 'expense', newExpense, httpOptions)
      .pipe(tap((_) => this.checkAlerts())); // Check alerts after expense creation
  }

  updateExpense(
    idExpense: string,
    updateExpense: FormData
  ): Observable<Expense> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http
      .put<Expense>(
        baseURL + 'expense/' + idExpense,
        updateExpense,
        httpOptions
      )
      .pipe(tap((_) => this.checkAlerts())); // Check alerts after expense creation
  }

  private checkAlerts(): void {
    this.userService.user.subscribe((loggedUser) => {
      if (loggedUser && loggedUser._id) {
        this.userService.getAlertsOfUser(loggedUser._id).subscribe((alerts) => {
          this.alertService.checkAlerts(alerts);
        });
      }
    });
  }

  getExpense(idExpense: string): Observable<Expense> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.get<Expense>(
      baseURL + 'expense/' + idExpense,
      httpOptions
    );
  }

  deleteExpense(idExpense: string): Observable<Expense> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http
      .delete<Expense>(baseURL + 'expense/' + idExpense, httpOptions)
      .pipe(tap((_) => this.checkAlerts())); // Check alerts after expense deletion
  }
}
