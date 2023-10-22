import { Component } from '@angular/core';
import { MenuType } from 'src/app/shared/models/menu-model';
import { GlobalDataContextService } from 'src/app/shared/services/global-data-context.service';

@Component({
  selector: 'app-personnel-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  personnelMenus: MenuType[] = [
    {text: 'Occupations', link: 'personnel/occupations'},
    {text: 'Persons', link: 'personnel/persons'},
    {text: 'Villages', link: 'location/villages'},
  ];
  constructor(private globalDataContextService: GlobalDataContextService) {
    this.globalDataContextService.menus$.next(this.personnelMenus);
  }
}
