import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Contact } from '../../ts/models/contact';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CrudService } from '../../services/crud.service';
import { interval } from 'rxjs';

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
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.crudService.getAll().subscribe((data: Contact[])=>{
      console.log(data);
      this.contacts = data;
    });
    interval(1000)
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  onDeleteClick(id: string, name: string): void {
    if(confirm('Are you sure you want to delete ' + name + '?')) {
      this.crudService.delete(id).subscribe(() => {
        alert(name + ' was deleted from your contacts');
        this.router.navigateByUrl('/',{skipLocationChange: true}).then(() => {
          this.router.navigate([decodeURI(this.location.path())]);
        });
      });
    }
  }

  trackByFn(index, item) {
    return index;
  }

}
