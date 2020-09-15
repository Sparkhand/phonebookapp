import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from '../contact';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  qs_id: string;
  contact_to_edit: Contact;

  constructor(
    public crudService: CrudService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.qs_id = this.route.snapshot.paramMap.get('id');
    this.crudService.getById(this.qs_id).subscribe((data: Contact)=>{
      this.contact_to_edit = data[0];
    })  
  }

  receiveContact($event){
    this.contact_to_edit = $event;
    this.confirmUpdate();
  } 

  confirmUpdate() {
    this.crudService.update(this.contact_to_edit).subscribe(res => {
      alert('Succesfully edited contact');
      this.router.navigate(['/read'])
    });
  }

}
