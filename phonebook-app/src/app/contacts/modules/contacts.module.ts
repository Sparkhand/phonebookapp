import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from '../contacts.component';
import { CreateComponent } from '../components/create/create.component';
import { ReadComponent } from '../components/read/read.component';
import { UpdateComponent } from '../components/update/update.component';
import { ReadDetailsComponent } from '../components/read-details/read-details.component';
import { ContactFormComponent } from '../components/contact-form/contact-form.component';
import { EffectsModule } from '@ngrx/effects';
import { ContactsEffects } from '../ngrx/contacts.effects';
import { StoreModule } from '@ngrx/store';
import * as fromContacts from '../ngrx/contacts.reducer';

@NgModule({
  declarations: [
    ContactsComponent,
    ReadComponent,
    CreateComponent,
    UpdateComponent,
    ReadDetailsComponent,
    ContactFormComponent
  ],
  imports: [
    ContactsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    EffectsModule.forFeature([ContactsEffects]),
    StoreModule.forFeature(fromContacts.contactsFeatureKey, fromContacts.ContactsReducer)
  ],
})

export class ContactsModule { }
