import { createAction, props } from '@ngrx/store';
import { Contact } from '../ts/models/contact';

export const loadContacts = createAction(
  '[Contacts] Load Contacts'
);

export const loadContactsSuccess = createAction(
  '[Contacts] Load Contacts Success',
  props<{ contacts: Contact[] }>()
);

export const contactsFailure = createAction(
  '[Contacts] Contacts Failure',
  props<{ payload: { errorMessage: string } }>()
);

export const deleteContact = createAction(
  '[Contacts] Delete Contact',
  props<{ payload: { contactId: string } }>()
);
