import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from '../../ts/models/contact';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CrudService } from '../../services/crud.service';
import { interval, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  qsId: string;
  contactToEdit$: Observable<Contact>;
  contact: Contact;

  constructor(
    public crudService: CrudService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.qsId = this.route.snapshot.paramMap.get('id');
    this.contactToEdit$ = this.crudService.getById(this.qsId)
    .pipe(
      tap(contact => this.contact = contact)
    );
    interval(1000)
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  receiveContactAndUpdate(contact: Contact): void {
    this.crudService.update(contact).subscribe();
    alert('Succesfully edited contact');
    this.router.navigate(['/read']);
  }

}
