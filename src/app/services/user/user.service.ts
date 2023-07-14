import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { baseURL } from '../../../app/shared/baseurl';
import { User } from 'src/app/entities/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from 'src/app/entities/category';
import { Expense } from 'src/app/entities/expense';
import { Alert } from 'src/app/entities/alert';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<User | null>; //a subject to keep track of user state, null when user is not logged in
  public user: Observable<User | null>; // an observable to save a readonly value of the subject

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User | null>(null); //we initiate it as null

    if (localStorage.getItem('token')) {
      //if token is available
      this.getUser().subscribe(); //we subscribe to the observable user and set it to userSubject and therefore  any changes in userSubject will be emitted to user
    }
    this.user = this.userSubject.asObservable(); // we convert the subject into a readonly observable, whihc emits the same values
  }

  register(formData: {
    name: string;
    surname: string;
    email: string;
    password: string;
  }): Observable<User> {
    console.log('formData: ', formData);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<User>(baseURL + 'user', formData, httpOptions);
  }

  getUser(): Observable<User> {
    // console.log('token: ', localStorage.getItem('token'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.get<User>(baseURL + 'user', httpOptions).pipe(
      tap((user) => {
        this.userSubject.next(user);
      })
    );
  }

  logOut() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  getUserById(id: string): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.get<User>(baseURL + 'user/by-id/' + id, httpOptions);
  }

  getUserByEmail(email: string): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.get<User>(baseURL + 'user/by-email/' + email, httpOptions);
  }

  updateUser(id: string, updatedUser: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.put<User>(
      baseURL + 'user/' + id,
      updatedUser,
      httpOptions
    );
  }

  deleteUser(id: string): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.delete<User>(baseURL + 'user/' + id, httpOptions);
  }

  getCategoriesOfUser(id: string): Observable<Category[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.get<Category[]>(
      baseURL + 'user/' + id + '/categories',
      httpOptions
    );
  }

  getExpensesOfUser(id: string): Observable<Expense[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.get<Expense[]>(
      baseURL + 'user/' + id + '/expenses',
      httpOptions
    );
  }

  getAlertsOfUser(id: string): Observable<Alert[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.get<Alert[]>(
      baseURL + 'user/' + id + '/alerts',
      httpOptions
    );
  }
}
