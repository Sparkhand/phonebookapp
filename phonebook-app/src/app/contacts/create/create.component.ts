import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../contact';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  contact: Contact;

  constructor(
    public crudService: CrudService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  model: Contact;

  receiveContact($event){
    this.contact = $event;
    this.confirmCreate();
  } 

  confirmCreate() {
    this.crudService.create(this.contact).subscribe(res => {
      alert('Succesfully created contact ' + res.name);
      this.router.navigate(['/read']);
    });
  }

}
