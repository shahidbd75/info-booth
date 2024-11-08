import { Component, OnInit } from '@angular/core';
import { GlobalDataContextService } from '../shared/services/global-data-context.service';
import { MenuType } from '../shared/models/menu-model';
import { HealthRoutePath } from './constant/health-route-path';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrl: './health.component.scss'
})
export class HealthComponent implements OnInit {
  cvMenus: MenuType[] = [
    { text: 'Specializations', link: 'health/specializations' },
    { text: 'Doctors', link: 'health/doctors' },
    { text: 'Hospitals', link: 'health/hospitals' },
  ];

  constructor(private globalDataContextService: GlobalDataContextService) {
  }
  
  ngOnInit(): void {
    this.globalDataContextService.menus$.next(this.cvMenus)
  }

}
