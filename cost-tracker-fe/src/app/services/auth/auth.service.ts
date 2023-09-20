import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { baseURL } from '../../../app/shared/baseurl';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import {  switchMap } from 'rxjs/operators';
import { User } from 'src/app/entities/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private userService: UserService) {}

  login(formData: { username: string; password: string }): Observable<User> {
    // console.log('formData: ', formData);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .post<{ access_token: string }>(
        baseURL + 'auth/login',
        formData,
        httpOptions
      )
      .pipe(
        tap((data) => {
          const accessToken = data.access_token;
          localStorage.setItem('token', accessToken);
        }),
        switchMap(() => this.userService.getUser())
      );
  }
}
