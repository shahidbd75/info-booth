import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuType } from '../models/menu-model';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataContextService {
  menus$ = new BehaviorSubject<MenuType[]>([]);
}
