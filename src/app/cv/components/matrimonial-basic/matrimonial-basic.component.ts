import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-matrimonial-basic',
  templateUrl: './matrimonial-basic.component.html',
  styleUrls: ['./matrimonial-basic.component.scss']
})
export class MatrimonialBasicComponent {
  @Input() PersonId: string | null;
}
