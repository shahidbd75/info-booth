import { Component, Input } from '@angular/core';
import { ProfessionalCvDataService } from '../../services/professional-cv-data.service';

@Component({
  selector: 'app-job-reference',
  templateUrl: './job-reference.component.html',
  styleUrls: ['./job-reference.component.scss']
})
export class JobReferenceComponent {
  personId: string | null;
  constructor(private dataService: ProfessionalCvDataService) {
    
  }
}
