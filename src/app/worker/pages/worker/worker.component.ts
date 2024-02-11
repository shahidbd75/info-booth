import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WorkerService } from '../../services/worker.service';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { PersonService } from 'src/app/personnel/services/person.service';
import { Observable } from 'rxjs';
import { WorkerRequestModel, WorkerResponseModel } from '../../types/worker-model';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss'],
})
export class WorkerComponent implements OnInit {
  workerForm: FormGroup;
  isEditMode = false;
  goodAts$: Observable<OptionsModel[]> = this.workerService.getGootAts();
  persons$: Observable<OptionsModel[]> = this.personService.getPersonOptions();
  workGroups$: Observable<OptionsModel[]> = this.workerService.getWorkGroups();
  workAbilities$: Observable<OptionsModel[]> = this.workerService.getWorkAbilities();
  perferableDays$: Observable<OptionsModel[]> = this.workerService.getPreferableDays();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private workerService: WorkerService,
    private personService: PersonService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.initializeFormGroup();
    this.loadData();
  }

  loadData() {
    if (this.workerService.selectedWorker) {
      const { id: personId, goodAts, workGroups, workAbilities, preferableDays, ...restvalues } = this.workerService.selectedWorker;
      const goodAtIds = goodAts.map(g => g.id);
      const workGroupIds = workGroups.map(wg => wg.id);
      const workAbilityIds = workAbilities.map(wa => wa.id);
      const preferableDayIds = preferableDays.map(pd => pd.id);
      this.isEditMode = true;
      this.workerForm.patchValue({
        ...restvalues,
        personId,
        goodAts: goodAtIds,
        workAbilities: workAbilityIds,
        perferableDays: preferableDayIds,
        workGroups: workGroupIds,
      });
      this.workerService.selectedWorker = null;
    }
  }
  initializeFormGroup() {
    this.workerForm = this.fb.group({
      personId: [null, [Validators.required]],
      teamLeaderName: ['', [Validators.maxLength(100)]],
      teamLeaderMobile: ['', [Validators.maxLength(30)]],
      totalTeamMember: [0],
      expectedWages: ['', [Validators.required, Validators.maxLength(10)]],
      goodAts: [null],
      workGroups: [null],
      workAbilities: [null],
      perferableDays: [null],
      detail: ['', [Validators.maxLength(250)]],
      isNegotiable: [false],
      startTime: [null],
      endTime: [null],
    });
  }

  onWorkerSave() {
    const { startTime, endTime, ...restValue } = this.workerForm.value;

    const requestModel: WorkerRequestModel = { ...restValue, startTime, endTime };

    this.workerService.saveWorker(requestModel).subscribe(
      () => {
        this.router.navigate(['worker/workers']);
      },
      error => console.log(error)
    );
  }

  onWorkerUpdate() {
    const requestModel: WorkerRequestModel = this.workerForm.value;
    this.workerService.updateWorker(requestModel).subscribe(
      () => {
        this.router.navigate(['worker/workers']);
      },
      error => console.log(error)
    );
  }

  resetForm() {
    this.router.navigate(['worker/workers']);
  }

  private formatTime(inputTime: string): string {
    const date = new Date();
    if (inputTime) {
      date.setHours(+inputTime.split(':')[0]);
      date.setMinutes(+inputTime.split(':')[1]);
    }

    return date.toLocaleTimeString([], { timeStyle: 'short' });
  }
  private loadFromParam() {
    this.activatedRoute.params.subscribe((param: Params) => {
      const { id } = param;
      if (id) {
        this.workerService.getWorkerById(id).subscribe((worker: WorkerResponseModel) => {
          this.workerForm.patchValue(worker);
        });
      }
    });
  }
}
