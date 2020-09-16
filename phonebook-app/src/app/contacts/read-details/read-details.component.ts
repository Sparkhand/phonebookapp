import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from '../contact';
import { CrudService } from '../../crud.service';

@Component({
  selector: 'app-read-details',
  templateUrl: './read-details.component.html',
  styleUrls: ['./read-details.component.css']
})
export class ReadDetailsComponent implements OnInit {

  qs_id: string;
  contact: Contact;

  constructor(
    public crudService: CrudService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.qs_id = this.route.snapshot.paramMap.get('id');
    this.crudService.getById(this.qs_id).subscribe((data: Contact)=>{
      console.log(data[0]);
      this.contact = data[0];
    })  
  }

  onDeleteClick(name: string) {
    if(confirm("Are you sure you want to delete " + name + "?")) {
      this.crudService.delete(this.qs_id).subscribe(() => {
        alert(name + " was deleted from your contacts");
        this.router.navigate(['/read'])
      });
    }
  }

}
