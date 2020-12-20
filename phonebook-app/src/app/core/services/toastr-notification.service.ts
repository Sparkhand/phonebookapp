import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrNotificationService {

  constructor(private toastr: ToastrService) { }

  showError(title: string, msg: string){
    this.toastr.error(msg, title, {
      timeOut: 1800,
      progressBar: true
    });
  }

}
