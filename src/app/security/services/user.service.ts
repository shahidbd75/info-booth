import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpRequestModel } from '../types/sign-up.model';
import { Observable } from 'rxjs';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { BaseHttpService } from 'src/app/shared/services/base.service';

@Injectable()
export class UserService extends BaseHttpService {
  constructor(private httpClient: HttpClient) {
    super(httpClient);
    this.setBaseUrl(API_ENDPOINT_CONST.USERS.BASE_URL);
  }

  signUp(requestModel: SignUpRequestModel): Observable<void> {
    return this.httpClient.post<void>(API_ENDPOINT_CONST.AUTH.SIGNUP, requestModel);
  }
}
