import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Contact } from '../ts/models/contact';
import * as contactsActions from '../ngrx/contacts.actions';

export const contactsFeatureKey = 'contactsFeatureKey';

export interface IContactsState extends EntityState<Contact> {
  isLoading: boolean;
  loadingError: string;
}

export const adapter: EntityAdapter<Contact> = createEntityAdapter<Contact>();

export const initialContactState: IContactsState = adapter.getInitialState({
  isLoading: true,
  loadingError: ""
});

const contactsReducer = createReducer(
  initialContactState,
  on(contactsActions.loadContactsSuccess, (state, { contacts }) => {
    return adapter.setAll(contacts, { ...state, isLoading: false });
  }),
  on(contactsActions.loadContactsFailure, (state, { errorMessage }) => {
    return adapter.setAll([], { ...state, isLoading: false, loadingError: errorMessage });
  })
);

export function ContactsReducer(state: IContactsState | undefined, action: Action) {
  return contactsReducer(state, action);
}

export const { selectAll: selectAllAvailableContacts } = adapter.getSelectors();
