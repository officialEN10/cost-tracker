import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseURL } from '../../../app/shared/baseurl';
import { Expense } from 'src/app/entities/expense';
import { Attachment } from 'src/app/entities/attachment';

@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
  constructor(private http: HttpClient) {}

  createAttachment(newAttachment: Attachment): Observable<Attachment> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.post<Attachment>(
      baseURL + 'attachment',
      newAttachment,
      httpOptions
    );
  }

  getAttachment(idAttachment: string): Observable<Attachment> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.get<Attachment>(
      baseURL + 'attachment/' + idAttachment,
      httpOptions
    );
  }

  updateAttachment(
    idAttachment: string,
    updatedAttachment: Attachment
  ): Observable<Attachment> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.put<Attachment>(
      baseURL + 'attachment/' + idAttachment,
      updatedAttachment,
      httpOptions
    );
  }

  deleteAttachment(idAttachment: string): Observable<Attachment> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.delete<Attachment>(
      baseURL + 'attachment/' + idAttachment,
      httpOptions
    );
  }
}
