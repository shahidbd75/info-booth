import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PersonService } from 'src/app/personnel/services/person.service';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss']
})
export class ProfessionalComponent implements OnInit {
  persons$: Observable<OptionsModel[]> = this.personService.getPersonOptions();
  personId: string;
  personControl = new FormControl(null, [Validators.required]);
  constructor(private personService: PersonService, private activatedRoute: ActivatedRoute, private router: Router) {}
  currentIndex = 0;

  ngOnInit(): void {
      this.activatedRoute.params.subscribe((params: Params) => {
        if(params['id']) {
          this.personId = params['id'];
          this.personControl.setValue(params['id']);
          this.personControl.disable();
        } else {
          this.personId = '';
          this.personControl.enable();
        }
      })
  }

  OnSelectedChange(index: number) {
    this.currentIndex = index;
  }

  onPersonSelect() {
    if(this.personControl.valid) {
      this.router.navigate([`cv/professional/${this.personControl.value}`]);
      this.personControl.disable();
    }
  }

  onClearPerson() {
    this.router.navigate([`cv/professional`]);
  }
}
