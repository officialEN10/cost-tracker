import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from 'src/app/entities/expense';

import { baseURL } from '../../../app/shared/baseurl';
import { Attachment } from 'src/app/entities/attachment';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private http: HttpClient) {}

  createExpense(newExpense: FormData): Observable<Expense> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.post<Expense>(
      baseURL + 'expense',
      newExpense,
      httpOptions
    );
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

  updateExpense(
    idExpense: string,
    updateExpense: FormData
  ): Observable<Expense> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.put<Expense>(
      baseURL + 'expense/' + idExpense,
      updateExpense,
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

    return this.http.delete<Expense>(
      baseURL + 'expense/' + idExpense,
      httpOptions
    );
  }
}

// getExpenseAttachment(attachmentId: string): Observable<Attachment> {
//   const httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer ' + localStorage.getItem('token'),
//     }),
//   };

//   return this.http.get<Attachment>(
//     baseURL + 'attachment/' + attachmentId,
//     httpOptions
//   );
// }
