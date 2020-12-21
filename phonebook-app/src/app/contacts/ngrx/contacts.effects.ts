import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
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
    map(contacts => contactsActions.loadContactsSuccess({ contacts })),
    catchError(error => {
      this.store.dispatch(contactsActions.loadContactsFailure({ errorMessage: error.message }));
      return EMPTY;
    })
  ));

  loadContactsFailure$ = createEffect(() => this.actions$.pipe(
    ofType(contactsActions.loadContactsFailure),
    tap(errorResponse => {
      /*
      this.modals.showError(
        "Error while loading contacts",
        errorResponse.errorMessage
      )
      */
      console.log('Error handling logic here');
      console.log(errorResponse.errorMessage);
    })
  ), { dispatch: false });

}
