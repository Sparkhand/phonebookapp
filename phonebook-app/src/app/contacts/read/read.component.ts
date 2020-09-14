import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact'; 
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  contacts: Contact[] = [];

  constructor(
    public crudService: CrudService
  ) { }

  ngOnInit(): void {
    this.crudService.getAll().subscribe((data: Contact[])=>{
      console.log(data);
      this.contacts = data;
    })  
  }

  onDeleteClick(id:string, name: string) {
    if(confirm("Are you sure you want to delete " + name + "?")) {
      this.crudService.delete(id).subscribe(() => {
        alert(name + " was deleted from your contacts");
        window.location.reload();
      });
    }
  }

}
