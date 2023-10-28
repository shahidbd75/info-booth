import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PersonService } from 'src/app/personnel/services/person.service';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { ProfessionalCvDataService } from '../../services/professional-cv-data.service';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss']
})
export class ProfessionalComponent {
  persons$: Observable<OptionsModel[]> = this.personService.getPersonOptions();
  personId: string | null;
  personControl = new FormControl(null, [Validators.required]);
  constructor(private personService: PersonService, private dataService: ProfessionalCvDataService) {}
  currentIndex = 0;

  OnSelectedChange(index: number) {
    this.currentIndex = index;
  }

  onPersonSelect() {
    if(this.personControl.valid) {
      this.personId = this.personControl.value;
      this.dataService.selectedPersonId = this.personControl.value;
      this.personControl.disable();
    }
  }
}
