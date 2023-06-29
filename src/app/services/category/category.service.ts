import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/entities/category';

import { baseURL } from '../../../app/shared/baseurl';
import { Expense } from 'src/app/entities/expense';
import { Alert } from 'src/app/entities/alert';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  createCategory(newCategory: Category): Observable<Category | any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.post<Category>(
      baseURL + 'category',
      newCategory,
      httpOptions
    );
  }

  getCategory(id: string): Observable<Category> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.get<Category>(baseURL + 'category/' + id, httpOptions);
  }

  updateCategory(
    id: string,
    updatedCategory: Category
  ): Observable<Category | any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.put<Category>(
      baseURL + 'category/' + id,
      updatedCategory,
      httpOptions
    );
  }

  deleteCategory(id: string): Observable<Category> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.delete<Category>(baseURL + 'category/' + id, httpOptions);
  }

  getCategoryExpenses(id: string): Observable<Expense[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.get<Expense[]>(
      baseURL + 'category/' + id + '/expenses',
      httpOptions
    );
  }

  getCategoryAlerts(id: string): Observable<Alert[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.get<Alert[]>(
      baseURL + 'category/' + id + '/alerts',
      httpOptions
    );
  }
}
