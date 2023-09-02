import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { PersonResponseModel } from '../types/person.model';

@Injectable()
export class PersonDataService {
  selectedPerson$: Subject<PersonResponseModel> = new ReplaySubject<PersonResponseModel>();
}
