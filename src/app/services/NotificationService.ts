import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {
  }

  success(title: string, message: string = ''){
    this.toastr.success(message, title, {
      progressBar: true,
      progressAnimation: 'decreasing',
      positionClass: 'toast-top-center',
      timeOut: 1500,
    });
  }

  error(title: string, message: string = '') {
    this.toastr.error(message, title, {
      progressBar: true,
      progressAnimation: 'decreasing',
      positionClass: 'toast-top-center',
      timeOut: 1500,
    });
  }
}
