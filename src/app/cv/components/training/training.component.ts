import { Component, Input } from '@angular/core';
import { ProfessionalCvDataService } from '../../services/professional-cv-data.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent {
  @Input({required: true}) PersonId: string |  null;
  constructor(private dataService: ProfessionalCvDataService) {
    
  }
}
