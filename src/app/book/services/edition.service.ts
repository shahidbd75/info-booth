import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT_CONST } from '../../../app/shared/constants/endpoints';
import { BaseHttpService } from '../../../app/shared/services/base.service';

@Injectable()
export class EditionService extends BaseHttpService {
  private base_url: string = API_ENDPOINT_CONST.BOOK.EDITION_BASE;

  constructor(http: HttpClient) {
    super(http);
    this.setBaseUrl(this.base_url);
  }
}
