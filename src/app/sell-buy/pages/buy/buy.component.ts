import { Component, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { VillageSelectComponent } from 'src/app/shared/village/village-select/village-select.component';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent {
  reset = false;
  onVillageChange(event: string) {
    console.log(event);
  }

  onReset() {
    this.reset = true;
  }
}
