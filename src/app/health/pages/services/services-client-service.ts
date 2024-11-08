import { HttpClient } from "@angular/common/http";
import { BaseHttpService } from "src/app/shared/services/base.service";

export class ServiceClientService extends BaseHttpService {
  constructor(http: HttpClient) {
    super(http);
  }

  
}