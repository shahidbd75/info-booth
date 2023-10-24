import { Component } from '@angular/core';
import { MenuType } from 'src/app/shared/models/menu-model';
import { GlobalDataContextService } from 'src/app/shared/services/global-data-context.service';

@Component({
  selector: 'app-cv-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  cvMenus: MenuType[] = [
    { text: 'Degrees', link: 'cv/degrees'},
    { text: 'Designations', link: 'cv/designations'},
    { text: 'Subjects', link: 'cv/subjects'},
    // {text: 'Books', link: 'book/books'},
  ];

  constructor(private globalDataContextService: GlobalDataContextService) {
    setTimeout(() => this.globalDataContextService.menus$.next(this.cvMenus), 0);
  }
}
