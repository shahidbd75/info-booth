import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotificationService} from "./services/notification.service";
import {NgbModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {ToastService} from "./services/toast.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModule,
    NgbTooltipModule
  ],
  providers: [NotificationService, ToastService]
})
export class NgbootstrapModule { }
