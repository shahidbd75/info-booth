import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { BaseHttpService } from 'src/app/shared/services/base.service';

@Injectable()
export class AgentService extends BaseHttpService {
  protected override BASE_URL: string = API_ENDPOINT_CONST.COMMON.AGENT_BASE;
  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }

  getOptions(): Observable<OptionsModel[]> {
    return this.httpClient.get<Array<OptionsModel>>(`${this.BASE_URL}/options`);
  }
}
