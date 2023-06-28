import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { baseURL } from '../../../app/shared/baseurl';
import { User } from 'src/app/entities/user';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<User | null>; //observable to keep track of user state, null when user is not logged in
  public user: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User | null>(null); //we initiate it at

    if (localStorage.getItem('token')) {
      //if token is available
      this.getUser().subscribe(); //we subscribe to the observable user and set it to userSubject and therefore  any changes in userSubject will be emitted to user
    }
    this.user = this.userSubject.asObservable(); //we create a readonly observable to share with key users
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
    console.log('token: ', localStorage.getItem('token'));
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
}
