import { SignUpRequestModel } from './../../types/sign-up.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NotificationService } from 'src/app/lib/material/notification/services/notification.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  signUpFormGroup: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService, private notificationService: NotificationService) {

  }

  ngOnInit(): void {
    this.createSignUpForm();
  }

  onSave() {
    if(this.signUpFormGroup.invalid) {
      return;
    }

    const signUpRequestModel: SignUpRequestModel= this.signUpFormGroup.getRawValue();

    this.userService.signUp(signUpRequestModel).subscribe({
      next: () => this.notificationService.success('Successfully created.'),
      error: () => this.notificationService.error('Not Saved.')
    });
  }

  private createSignUpForm() {
    this.signUpFormGroup = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(50)]],
      fullName: ['', [Validators.required, Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.maxLength(50)]],
    })
  }
}
