import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as contactsReducer from './contacts.reducer';

export const selectContactsState = createFeatureSelector<contactsReducer.IContactsState>('contactsFeatureKey');

export const selectAllContacts = () => createSelector(
  selectContactsState,
  contactsReducer.selectAllAvailableContacts,
);


export const areContactsLoading = () => createSelector(
  selectContactsState,
  contactsState => contactsState.isLoading
);

export const didLoadingFail = () => createSelector(
  selectContactsState,
  contactsState => contactsState.loadingError
);
