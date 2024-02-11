import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequestModel, LoginResponseModel } from '../../types/login.model';
import { NotificationService } from 'src/app/lib/material/notification/services/notification.service';
import { AuthDataService } from '../../services/auth-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginRequestModel: LoginRequestModel;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthDataService,
    private notificationService: NotificationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.createFormGroup();
  }

  onLoginClick() {
    if (this.loginForm.valid) {
      this.loginRequestModel = this.loginForm.getRawValue();
      this.authService.login(this.loginRequestModel).subscribe({
        next: (response: LoginResponseModel) => {
          if (response) {
            localStorage.setItem('auth_token', response.token);
            this.router.navigate(['/']);
          }
        },
        error: () => {
          this.notificationService.error('Invalid username or password');
        },
      });
    }
  }

  private createFormGroup() {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }
}
