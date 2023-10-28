import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProfessionalCvDataService } from '../../services/professional-cv-data.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit, OnDestroy {
  @Input({required: true}) PersonId: string | null;
  constructor(private dataService: ProfessionalCvDataService) {

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
