import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from '../../ts/models/contact';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { interval, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CrudService } from 'src/app/core/services/crud.service';

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
    this.crudService.update(contact)
    .pipe(untilDestroyed(this))
    .subscribe(_ => {
      alert('Succesfully edited contact');
      this.router.navigate(['/read']);
    }, _ => {
      alert('Error while editing contact');
    });
  }

}
