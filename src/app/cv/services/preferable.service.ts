import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { BaseHttpService } from 'src/app/shared/services/base.service';

@Injectable()
export class PreferableService extends BaseHttpService {
  protected override BASE_URL = API_ENDPOINT_CONST.CV.PREFERABLE_BASE;
  constructor(http: HttpClient) {
    super(http);
  }
}
