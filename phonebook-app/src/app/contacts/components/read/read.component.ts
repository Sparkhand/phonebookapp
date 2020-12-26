import { Component, OnInit } from '@angular/core';
import { Contact } from '../../ts/models/contact';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { interval, Observable } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import * as contactsActions from '../../ngrx/contacts.actions';
import * as contactsSelectors from '../../ngrx/contacts.selectors';
import { isEmpty, tap } from 'rxjs/operators';
import { ModalsService } from 'src/app/core/services/modals.service';

@UntilDestroy()
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  contacts: Contact[] = [];

  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string>;
  contacts$: Observable<Contact[]>;

  constructor(
    private store: Store<AppState>,
    public crudService: CrudService,
    private modal: ModalsService
  ) { }

  ngOnInit(): void {
    this.store.dispatch(contactsActions.loadContacts());

    this.isLoading$ = this.store.pipe(select(contactsSelectors.areContactsLoading()));

    this.contacts$ = this.store.pipe(select(contactsSelectors.selectAllContacts()));
  }

  onDeleteClick(id: string, name: string): void {
    if (confirm('Are you sure you want to delete ' + name + '?')) {
      this.store.dispatch(contactsActions.deleteContact({ payload: { contactId: id } }));
    }
  }

  trackByFn(_, contact: Contact): string {
    return contact.id;
  }

}
