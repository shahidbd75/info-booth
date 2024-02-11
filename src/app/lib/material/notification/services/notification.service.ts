import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';

@Injectable()
export class NotificationService {
  constructor(private toastService: ToastService) {}

  success(message: string, action = 'Ok') {
    this.toastService.showToast(message, action, 3000, 'bg-success');
  }

  error(message: string, action = 'Try Again!') {
    this.toastService.showToast(message, action, 3000, 'bg-danger');
  }

  warning(message: string, action?: string) {
    this.toastService.showToast(message, action, 3000, 'bg-warning');
  }

  info(message: string, action?: string) {
    this.toastService.showToast(message, action, 3000, 'bg-info');
  }
}
