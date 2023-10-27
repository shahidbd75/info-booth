import { Component } from '@angular/core';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss']
})
export class ProfessionalComponent {

  currentIndex = 0;
  OnSelectedChange(index: number) {
    this.currentIndex = index;
  }
}
