import { Component } from '@angular/core';
import { MenuType } from 'src/app/shared/models/menu-model';
import { GlobalDataContextService } from 'src/app/shared/services/global-data-context.service';

@Component({
  selector: 'app-book-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  bookMenus: MenuType[] = [
    { text: 'Book Categories', link: 'book/book-categories' },
    { text: 'Editions', link: 'book/editions' },
    { text: 'Languages', link: 'settings/languages' },
    { text: 'Books', link: 'book/books' },
  ];
  constructor(private globalDataContextService: GlobalDataContextService) {
    this.globalDataContextService.menus$.next(this.bookMenus);
  }
}
