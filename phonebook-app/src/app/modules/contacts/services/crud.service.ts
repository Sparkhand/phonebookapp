import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { Contact } from '../ts/models/contact';

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
  getAll(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(env.contactApiServer + '/get/')
    .pipe(
      catchError(this.errorHandler)
    );
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
  delete(id: string): Observable<Contact>{
    return this.httpClient.delete<Contact>(env.contactApiServer + '/delete/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Error handling function
  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }

}
