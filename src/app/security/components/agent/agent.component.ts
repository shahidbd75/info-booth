import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, delay } from 'rxjs';
import { AgentService } from '../../services/agent.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AgentRequestModel, AgentResponseModel, AgentUpdateModel } from '../../types/agent-model';
import { NotificationService } from 'src/app/lib/material/notification/services/notification.service';
import { NotificationMessage } from 'src/app/shared/constants/notification-message';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { OptionsService } from 'src/app/shared/services/options.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss'],
})
export class AgentComponent implements OnInit, OnDestroy {
  isEditMode = false;
  formGroup: FormGroup;
  subscription: Subscription = new Subscription();
  districts$: Observable<OptionsModel[]> = this.optionService.getDistricts().pipe(delay(4));
  upazilas$: Observable<OptionsModel[]>;
  constructor(
    private formBuilder: FormBuilder,
    private agentService: AgentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: NotificationService,
    private optionService: OptionsService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      districtId: [null, [Validators.required]],
      upazilaId: [null],
    });

    this.loadData();
  }

  onSave() {
    const requestModel: AgentRequestModel = this.formGroup.value;

    this.subscription.add(
      this.agentService.save(requestModel).subscribe({
        next: () => {
          this.router.navigate(['user/agents']);
        },
        error: () => this.messageService.error(NotificationMessage.SavedFailure),
      })
    );
  }

  onUpdate() {
    const requestModel: AgentUpdateModel = this.formGroup.value;

    this.subscription.add(
      this.agentService.update(requestModel).subscribe({
        next: () => {
          this.router.navigate(['user/agents']);
        },
        error: () => this.messageService.error(NotificationMessage.UpdatedSuccessfully),
      })
    );
  }

  loadUpazilas() {
    const { districtId } = this.formGroup.value;

    this.formGroup.controls['upazilaId'].reset();
    this.upazilas$ = this.optionService.getUpazilas(districtId);
  }

  resetForm() {
    this.formGroup.reset();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  loadData() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const id: string = params['id'];
      if (id) {
        this.subscription.add(
          this.agentService.getById<AgentResponseModel>(id).subscribe((data: AgentResponseModel) => {
            const { createdDate, isActive, districtName, upazilaName, upazilaId, ...restValue } = data;
            this.formGroup.setValue({
              ...restValue,
              upazilaId,
            });
            this.loadUpazilas();
            this.formGroup.patchValue({ upazilaId: upazilaId });
          })
        );
        this.isEditMode = true;
      }
    });
  }
}
