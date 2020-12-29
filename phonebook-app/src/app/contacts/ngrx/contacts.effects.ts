import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { CrudService } from 'src/app/core/services/crud.service';
import { ModalsService } from 'src/app/core/services/modals.service';
import { AppState } from 'src/app/reducers';
import * as contactsActions from './contacts.actions';

@Injectable()
export class ContactsEffects {

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private crudService: CrudService,
    private modals: ModalsService
  ) { }

  contactsFetchAction$ = createEffect(() => this.actions$.pipe(
    ofType(contactsActions.loadContacts),
    switchMap(_ => this.crudService.fetchData$()),
    map(contacts => contactsActions.loadContactsSuccess({ contacts }))
  ));

  loadContactsFailure$ = createEffect(() => this.actions$.pipe(
    ofType(contactsActions.contactsFailure),
    tap(action => {
      this.modals.showError("Contacts List Error", action.payload.errorMessage);
    })
  ), { dispatch: false });

  deleteContact$ = createEffect(() => this.actions$.pipe(
    ofType(contactsActions.deleteContact),
    mergeMap(action => this.crudService.delete(action.payload.contactId)),
    map(_ => contactsActions.loadContacts())
  ));

}
