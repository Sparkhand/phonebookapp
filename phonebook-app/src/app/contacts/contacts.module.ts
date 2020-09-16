import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';

import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';
import { UpdateComponent } from './update/update.component';
import { ReadDetailsComponent } from './read-details/read-details.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

import { CrudService } from '../crud.service';

@NgModule({
  declarations: [ContactsComponent, ReadComponent, HomeComponent, CreateComponent, UpdateComponent, ReadDetailsComponent, ContactFormComponent],
  imports: [
    ContactsRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [CrudService],
})
export class ContactsModule { }