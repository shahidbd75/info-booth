import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT_CONST } from '../../shared/constants/endpoints';
import { Observable } from 'rxjs';
import { OptionsModel } from '../../shared/models/options-model';

@Injectable()
export class LanguageService extends BaseHttpService{

  constructor(http: HttpClient) {
    super(http);
    this.setBaseUrl(API_ENDPOINT_CONST.COMMON.LANGUAGE_BASE);
  }

  getLanguageOptions(): Observable<Array<OptionsModel>> {
    return this.http.get<Array<OptionsModel>>(`${this.BASE_URL}/options`);
  }
}
