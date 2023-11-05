import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ProfessionalCvDataService {
    selectedPersonId: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);    
}