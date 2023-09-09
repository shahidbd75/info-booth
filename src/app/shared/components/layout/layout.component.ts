import {Component, inject, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Observable} from "rxjs";
import {map, shareReplay} from "rxjs/operators";
import { GlobalDataContextService } from '../../services/global-data-context.service';
import { MenuType } from '../../models/menu-model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit{
  navigation: Array<MenuType>;
  private breakpointObserver = inject(BreakpointObserver);

  constructor(private globalDataContextService: GlobalDataContextService){}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    
    
    
  ngOnInit(): void {
    this.navigation = [
      {text: 'Sub Categories', link:'buy-sell/sub-categories'},
      {text: 'Occupations', link: 'personnel/occupations'},
      {text: 'Persons', link: 'personnel/persons'},
      {text: 'Items', link: 'buy-sell'},
      {text: 'Villages', link: 'buy-sell/sell-list'}
    ];

    // this.globalDataContextService.menus$.subscribe((newMenus:MenuType[]) => {
    //   if(newMenus.length > 0) {
    //     this.navigation = [...newMenus];
    //   }
    // });
  }


}
