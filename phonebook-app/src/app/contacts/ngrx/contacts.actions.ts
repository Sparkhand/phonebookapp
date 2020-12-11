import { createAction, props } from '@ngrx/store';
import { Contact } from '../ts/models/contact';

export const loadContacts = createAction(
  '[Contacts] Load Contacts'
);

export const loadContactsSuccess = createAction(
  '[Contacts] Load Contacts Success',
  props<{ contacts: Contact[] }>()
);

export const loadContactsFailure = createAction(
  '[Contacts] Load Contacts Failure',
  props<{ errorMessage: string }>()
);
