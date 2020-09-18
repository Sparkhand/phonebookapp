import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../../ts/models/contact';
import { CrudService } from '../../services/crud.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { interval } from 'rxjs';

@UntilDestroy()
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
    interval(1000)
      .pipe(untilDestroyed(this))
      .subscribe();
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
