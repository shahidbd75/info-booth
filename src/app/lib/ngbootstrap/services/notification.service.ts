import { Injectable, OnDestroy } from '@angular/core';
import { ToastService } from './toast.service';

@Injectable()
export class NotificationService {
  constructor(public toastService: ToastService) {}

  message(text: string) {
    this.toastService.show(text);
  }

  success(message: string) {
    this.toastService.show(message, { classname: 'bg-success text-light', delay: 10000 });
  }

  error(message: string) {
    this.toastService.show(message, { classname: 'bg-danger text-light', delay: 15000 });
  }

  warning(message: string) {
    this.toastService.show(message, { classname: 'bg-warning text-light', delay: 15000 });
  }
}
