import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})

export class ContactFormComponent {

  @Input() init_contact: Contact = {
    id: '',
    name: '',
    number: '',
    email: '',
    tags: []
  };
  @Output() submitEvent = new EventEmitter<Contact>();

  onSubmit(f: NgForm) {
    this.init_contact.name = f.value.name;
    this.init_contact.number = f.value.number;
    this.init_contact.email = f.value.email;
    this.submitEvent.emit(this.init_contact);
  }

}
