import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT_CONST } from '../../../app/shared/constants/endpoints';
import { BaseHttpService } from '../../../app/shared/services/base.service';

@Injectable()
export class EditionService extends BaseHttpService {
  protected override BASE_URL: string = API_ENDPOINT_CONST.BOOK.EDITION_BASE;

  constructor(http: HttpClient) {
    super(http);
  }
}
