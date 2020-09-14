import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';

import { HomeComponent } from './home/home.component';

import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';
import { UpdateComponent } from './update/update.component';
import { ReadDetailsComponent } from './read-details/read-details.component';


@NgModule({
  declarations: [ContactsComponent, ReadComponent, HomeComponent, CreateComponent, UpdateComponent, ReadDetailsComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class ContactsModule { }
