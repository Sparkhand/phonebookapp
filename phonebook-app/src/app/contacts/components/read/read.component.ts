import { Component, OnInit } from '@angular/core';
import { Contact } from '../../ts/models/contact';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { interval } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';

@UntilDestroy()
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  contacts: Contact[] = [];

  constructor(
    public crudService: CrudService,
  ) { }

  ngOnInit(): void {
    this.crudService.fetchData$()
      .pipe(untilDestroyed(this))
      .subscribe((data: Contact[]) => {
        console.log(data);
        this.contacts = data;
      });
  }

  onDeleteClick(id: string, name: string): void {
    if(confirm('Are you sure you want to delete ' + name + '?')) {
      this.crudService.delete(id).pipe(untilDestroyed(this))
      .subscribe(_ => {
        alert(name + ' was deleted from your contacts');
        this.contacts = this.contacts.filter(contact => contact.id !== id);
      }, _ => {
        alert('Error while deleting ' + name);
      });
    }
  }

  trackByFn(index, item) {
    return index;
  }

}
