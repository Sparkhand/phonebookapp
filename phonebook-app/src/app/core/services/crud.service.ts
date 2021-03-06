import { Injectable } from '@angular/core';
import { interval, Observable, throwError, timer } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { Contact } from 'src/app/contacts/ts/models/contact';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import * as contactsActions from '../../contacts/ngrx/contacts.actions';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient,
    private store: Store<AppState>
  ) { }

  // CREATE
  create(contact: Contact): Observable<Contact> {
    return this.httpClient.post<Contact>(env.contactApiServer + '/post/', contact, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // READ
  fetchData$(): Observable<Contact[]> {
    return timer(0, 1000)
      .pipe(
        switchMap(_ => this.getAll()),
        catchError(_ => {
          this.store.dispatch(contactsActions.contactsFailure({ payload: { errorMessage: 'Error while loading contacs' } }));
          return EMPTY;
        })
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
        catchError(_ => {
          this.store.dispatch(contactsActions.contactsFailure({ payload: { errorMessage: 'Error deleting contact' } }));
          return EMPTY;
        })
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
