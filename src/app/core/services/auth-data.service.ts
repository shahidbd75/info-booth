import { Injectable, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { LoginRequestModel, LoginResponseModel } from '../types/login.model';
import { Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtClaimsTypes } from '../types/jwt-claims.model';

@Injectable()
export class AuthDataService {
  authenticateUserSig = signal<JwtClaimsTypes | undefined | null>(undefined);
  constructor(private authService: AuthService, private jwtHelper: JwtHelperService) {

  }

   login(requestModel: LoginRequestModel): Observable<LoginResponseModel> {
    return this.authService.login(requestModel).pipe(tap((data: LoginResponseModel) => {
      const userDetails = this.jwtHelper.decodeToken(data.token);
      this.authenticateUserSig.set(<JwtClaimsTypes>userDetails);
      console.log(userDetails);
    }));
   }

   get isLoggedIn(): boolean {
    const token = localStorage.getItem('auth_token');

    if(!token) {
      return false;
    }

    const userDetails = this.jwtHelper.decodeToken(token);
    this.authenticateUserSig.set(<JwtClaimsTypes>userDetails);
    return userDetails !== undefined && userDetails !== null;
   }

   logout() {
    localStorage.setItem('auth_token', '');
    this.authenticateUserSig.set(null);
   }
}
