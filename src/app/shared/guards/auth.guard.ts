import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthDataService } from 'src/app/core/services/auth-data.service';

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = inject(AuthDataService).isLoggedIn;

  if (!isLoggedIn) {
    inject(Router).navigate(['login']);
  }

  return isLoggedIn;
};
