import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from '../../ts/models/contact';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CrudService } from '../../services/crud.service';
import { interval } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-read-details',
  templateUrl: './read-details.component.html',
  styleUrls: ['./read-details.component.css']
})
export class ReadDetailsComponent implements OnInit {

  qsId: string;
  contact: Contact;

  constructor(
    public crudService: CrudService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.qsId = this.route.snapshot.paramMap.get('id');
    this.crudService.getById(this.qsId).subscribe((data: Contact) => {
      this.contact = data;
    });
    interval(1000)
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  onDeleteClick(name: string): void {
    if (confirm('Are you sure you want to delete ' + name + '?')) {
      this.crudService.delete(this.qsId).subscribe(() => {
        alert(name + ' was deleted from your contacts');
        this.router.navigate(['/read']);
      });
    }
  }

}
