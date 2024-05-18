import { Component } from '@angular/core';
import { MenuType } from 'src/app/shared/models/menu-model';
import { GlobalDataContextService } from 'src/app/shared/services/global-data-context.service';

@Component({
  selector: 'app-tution-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  cvMenus: MenuType[] = [
    { text: 'Posts', link: 'tution/posts' },
    { text: 'Tutors', link: 'tution/tutors' },
  ];

  constructor(private globalDataContextService: GlobalDataContextService) {
    setTimeout(() => this.globalDataContextService.menus$.next(this.cvMenus), 0);
  }
}
