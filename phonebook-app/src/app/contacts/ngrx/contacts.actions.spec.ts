import * as fromContacts from './contacts.actions';

describe('loadContactss', () => {
  it('should return an action', () => {
    expect(fromContacts.loadContactss().type).toBe('[Contacts] Load Contactss');
  });
});
