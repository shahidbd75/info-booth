import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkerService } from '../../services/worker.service';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { PersonService } from 'src/app/personnel/services/person.service';
import { Observable } from 'rxjs';
import { WorkerRequestModel } from '../../types/worker-model';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss']
})
export class WorkerComponent implements OnInit {
  workerForm: FormGroup;
  isEditMode = false;
  goodAts: OptionsModel[];
  persons$: Observable<OptionsModel[]> = this.personService.getPersonOptions();
  workGroups$: Observable<OptionsModel[]> = this.workerService.getWorkGroups();
  workAbilities$: Observable<OptionsModel[]> = this.workerService.getWorkAbilities();
  perferableDays$: Observable<OptionsModel[]> = this.workerService.getPreferableDays();

  constructor(private fb: FormBuilder, private router: Router, private workerService: WorkerService, private personService: PersonService) {

  }
  ngOnInit(): void {
    this.initializeFormGroup();
    this.workerService.getGootAts().subscribe((options: OptionsModel[]) => this.goodAts = options);
  }
  initializeFormGroup() {
    this.workerForm = this.fb.group({
      personId: [null, [Validators.required]],
      teamLeaderName: ['', [Validators.required,Validators.maxLength(100)]],
      teamLeaderMobile: ['', [Validators.required,Validators.maxLength(30)]],
      totalTeamMember: ['', [Validators.required]],
      expectedWages: [0, [Validators.required]],
      goodAts: [null],
      workGroups:[null],
      workAbilities:[null],
      perferableDays:[null],
      detail: ['', [Validators.maxLength(250)]],
      isNegotiable: [false],
      startTime:[null],
      endTime:[null]
    });
  }

  onWorkerSave() {
    const {startTime, endTime, ...restValue}: WorkerRequestModel = this.workerForm.value;

    // console.log({startTime: startTime,endTime: new Date(endTime)});
    // return;
    this.workerService.saveWorker({...restValue, startTime: new Date(startTime),endTime: new Date(endTime)}).subscribe(()=> {
      this.router.navigate(['worker/workers']);
    },(error) => console.log(error));
  }

  onWorkerUpdate() {
    const requestModel: WorkerRequestModel = this.workerForm.value;
    this.workerService.updateWorker(requestModel).subscribe(()=> {
      this.router.navigate(['worker/workers']);
    },(error) => console.log(error));
  }

  resetForm() {
    this.router.navigate(['worker/workers']);
  }
}
