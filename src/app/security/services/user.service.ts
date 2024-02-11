import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpRequestModel } from '../types/sign-up.model';
import { Observable } from 'rxjs';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {}

  signUp(requestModel: SignUpRequestModel): Observable<void> {
    return this.httpClient.post<void>(API_ENDPOINT_CONST.AUTH.SIGNUP, requestModel);
  }
}
