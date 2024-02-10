import { Component } from '@angular/core';
import { MenuType } from 'src/app/shared/models/menu-model';
import { GlobalDataContextService } from 'src/app/shared/services/global-data-context.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  userMenu: MenuType[] = [
    {text: 'users', link: 'user/users'},
  ];
  constructor(private globalDataContextService: GlobalDataContextService) {
    this.globalDataContextService.menus$.next(this.userMenu);
  }
}
