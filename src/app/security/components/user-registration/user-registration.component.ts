import { SignUpRequestModel } from './../../types/sign-up.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NotificationService } from 'src/app/lib/material/notification/services/notification.service';
import { AgentService } from '../../services/agent.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserResponseModel } from '../../types/user-model';

@Component({
    selector: 'app-user-registration',
    templateUrl: './user-registration.component.html',
    styleUrls: ['./user-registration.component.scss'],
    standalone: false
})
export class UserRegistrationComponent implements OnInit {
  signUpFormGroup: FormGroup;
  agents$ = this.agentService.getOptions();
  subscription: Subscription = new Subscription();
  isEditMode = false;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private agentService: AgentService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createSignUpForm();
    this.loadData();
  }

  onSave() {
    if (this.signUpFormGroup.invalid) {
      return;
    }

    const signUpRequestModel: SignUpRequestModel = this.signUpFormGroup.getRawValue();

    this.userService.signUp(signUpRequestModel).subscribe({
      next: () => this.notificationService.success('Successfully created.'),
      error: () => this.notificationService.error('Not Saved.'),
    });
  }

  loadData() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const id: string = params['id'];
      if (id) {
        this.subscription.add(
          this.userService.getById<UserResponseModel>(id).subscribe((data: UserResponseModel) => {
            const { agentName, ...restValue } = data;
            this.signUpFormGroup.patchValue({
              ...restValue,
            });
          })
        );
        this.isEditMode = true;
      }
    });
  }

  private createSignUpForm() {
    this.signUpFormGroup = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(50)]],
      fullName: ['', [Validators.required, Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.maxLength(50)]],
      agentId: [null],
    });
  }
}
