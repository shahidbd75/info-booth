import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  showToast(message: string, action = 'Close', duration = 3000, panelClass?: string | string[]) {
    this.snackBar.open(message, action, {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass,
    });
  }
}
