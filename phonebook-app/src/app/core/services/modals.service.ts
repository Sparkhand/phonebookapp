import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  constructor(private toastr: ToastrService) { }

  showError(title: string, message: string){
    this.toastr.error(message, title, {
      timeOut: 2500,
      progressBar: true
    });
  }
}
