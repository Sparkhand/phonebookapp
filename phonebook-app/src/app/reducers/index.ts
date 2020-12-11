import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as contactsReducer from '../contacts/ngrx/contacts.reducer';

export interface AppState {
  contactsFeatureKey: contactsReducer.IContactsState;
}

export const reducers: ActionReducerMap<AppState> = {
  contactsFeatureKey: contactsReducer.ContactsReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
