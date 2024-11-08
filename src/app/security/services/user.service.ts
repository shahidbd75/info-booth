import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpRequestModel } from '../types/sign-up.model';
import { Observable } from 'rxjs';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { BaseHttpService } from 'src/app/shared/services/base.service';

@Injectable()
export class UserService extends BaseHttpService {
  protected override BASE_URL: string = API_ENDPOINT_CONST.USERS.BASE_URL;
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  signUp(requestModel: SignUpRequestModel): Observable<void> {
    return this.httpClient.post<void>(API_ENDPOINT_CONST.AUTH.SIGNUP, requestModel);
  }
}
