import { Component } from '@angular/core';
import { MenuType } from 'src/app/shared/models/menu-model';
import { GlobalDataContextService } from 'src/app/shared/services/global-data-context.service';

@Component({
  selector: 'app-sellbuy-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  personnelMenus: MenuType[] = [
    {text: 'Sub Categories', link:'buy-sell/sub-categories'},
    {text: 'Items', link: 'buy-sell'},
  ];
  constructor(private globalDataContextService: GlobalDataContextService) {
    this.globalDataContextService.menus$.next(this.personnelMenus);
  }
}
