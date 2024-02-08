import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequestModel, LoginResponseModel } from '../types/login.model';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(requestModel:LoginRequestModel): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>(API_ENDPOINT_CONST.AUTH.LOGIN, requestModel);
  }
}
