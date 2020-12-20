import { Injectable } from '@angular/core';
import { interval, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { Contact } from 'src/app/contacts/ts/models/contact';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  // CREATE
  create(contact: Contact): Observable<Contact> {
    return this.httpClient.post<Contact>(env.contactApiServer + '/post/', contact, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // READ
  fetchData$(): Observable<Contact[]> {
    return interval(1000)
      .pipe(
        switchMap(_ => this.getAll()),
        catchError(this.errorHandler)
      );
  }

  getAll(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(env.contactApiServer + '/get/');
  }

  getById(id: string): Observable<Contact> {
    return this.httpClient.get<Contact[]>(env.contactApiServer + '/get/' + id)
      .pipe(
        map((retrievedContact: Contact[]) => retrievedContact[0]),
        catchError(this.errorHandler)
      );
  }

  // UPDATE
  update(contact: Contact): Observable<Contact> {
    return this.httpClient.put<Contact>(env.contactApiServer + '/put/', contact, this.httpOptions)
      .pipe(
        map((updatedContact: Contact) => updatedContact),
        catchError(this.errorHandler)
      );
  }

  // DELETE
  delete(id: string): Observable<Contact> {
    return this.httpClient.delete<Contact>(env.contactApiServer + '/delete/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Error handling function
  errorHandler(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
