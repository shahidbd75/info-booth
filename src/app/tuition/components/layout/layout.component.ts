import { Component } from '@angular/core';
import { MenuType } from 'src/app/shared/models/menu-model';
import { GlobalDataContextService } from 'src/app/shared/services/global-data-context.service';

@Component({
    selector: 'app-tution-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    standalone: false
})
export class LayoutComponent {
  cvMenus: MenuType[] = [
    { text: 'Posts', link: 'tuition/posts' },
    { text: 'Tutors', link: 'tuition/tutors' },
  ];

  constructor(private globalDataContextService: GlobalDataContextService) {
    setTimeout(() => this.globalDataContextService.menus$.next(this.cvMenus), 0);
  }
}
