import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Contact } from './contact';

@Injectable({
  providedIn: 'any'
})
export class CrudService {

  private apiServer = "http://localhost:3000";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  //CREATE
  create(contact): Observable<Contact> {
    return this.httpClient.post<Contact>(this.apiServer + '/post/', JSON.stringify(contact), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  //READ
  getAll(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(this.apiServer + '/get/')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getById(id): Observable<Contact> {
    return this.httpClient.get<Contact>(this.apiServer + '/get/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  //UPDATE
  update(id, contact): Observable<Contact> {
    return this.httpClient.put<Contact>(this.apiServer + '/put/' + id, JSON.stringify(contact), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  //DELETE
  delete(id){
    return this.httpClient.delete<Contact>(this.apiServer + '/delete/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  //Error handling function
  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }

  constructor(private httpClient: HttpClient) { }
}
