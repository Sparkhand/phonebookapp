import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Contact } from '../../ts/models/contact';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})

export class ContactFormComponent implements OnChanges {

  @Input() initContact: Contact;
  @Output() submitEvent = new EventEmitter<Contact>();

  contactForm = new FormGroup({
    name: new FormControl(''),
    number: new FormControl(''),
    email: new FormControl('')
  });

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.initContact.currentValue){
      this.contactForm.patchValue({
        name: changes.initContact.currentValue.name,
        number: changes.initContact.currentValue.number,
        email: changes.initContact.currentValue.email
      });
    }
  }

  onSubmit(): void {
    const c: Contact = {
      id: this.initContact.id,
      name: this.contactForm.get('name').value,
      number: this.contactForm.get('number').value,
      email: this.contactForm.get('email').value,
      tags: this.initContact.tags
    };
    this.submitEvent.emit(c);
  }

}
