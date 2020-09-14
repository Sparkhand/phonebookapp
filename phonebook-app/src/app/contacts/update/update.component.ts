import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../contact';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  qs_id: string;
  contact: Contact;

  constructor(
    public crudService: CrudService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.qs_id = this.route.snapshot.paramMap.get('id');
    this.crudService.getById(this.qs_id).subscribe((data: Contact)=>{
      console.log(data[0]);
      this.contact = data[0];
    })  
  }

}
