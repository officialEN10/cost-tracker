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

  createAttachment(newAttachment: FormData): Observable<Attachment> {
    const httpOptions = {
      headers: new HttpHeaders({
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
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.get<Attachment>(
      baseURL + 'attachment/' + idAttachment,
      httpOptions
    );
  }

  serveAttachment(idAttachment: string): Observable<Blob> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
      responseType: 'blob' as 'json',
    };

    return this.http.get<Blob>(
      baseURL + 'attachment/download/' + idAttachment,
      httpOptions
    );
  }

  // A helper method for downloading the file
  createAndDownloadFile(fileName: string, blob: Blob) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(url);
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
