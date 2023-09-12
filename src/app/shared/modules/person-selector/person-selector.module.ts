import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import { PersonSelectorComponent } from './person-selector.component';



@NgModule({
  declarations: [
    PersonSelectorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule
  ]
})
export class PersonSelectorModule { }
