import { Component, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { VillageSelectComponent } from 'src/app/shared/modules/village-select/village-select.component';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss'],
})
export class BuyComponent {
  villageId = '9754110e-c315-4d51-8a87-d856b0caabec';
  reset = false;
  onVillageChange(event: string) {
    console.log(event);
  }

  onReset() {
    this.reset = true;
  }
}
