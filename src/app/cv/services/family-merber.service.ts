import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { BaseHttpService } from 'src/app/shared/services/base.service';
import { FamilyMemberTableResponseType } from '../types/family-member-type';

@Injectable()
export class FamilyMerberService extends BaseHttpService {

  constructor(http: HttpClient) { 
    super(http);
    this.setBaseUrl(API_ENDPOINT_CONST.CV.FAMILY_MEMBER_BASE);
  }

  getFamilyMemerbersByPersonId(personId: string): Observable<FamilyMemberTableResponseType[]> {
    return this.http.get<FamilyMemberTableResponseType[]>(API_ENDPOINT_CONST.CV.GET_FAMILY_MEMBERS_BY_PERSON(personId));
  }
}
