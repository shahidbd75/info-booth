import { Component, OnInit, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { GlobalDataContextService } from '../../services/global-data-context.service';
import { BaseMenus } from '../../constants/base-menus';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: false
})
export class DashboardComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);

  constructor(private contextService: GlobalDataContextService) {}

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Recent Posts', cols: 1, rows: 1 },
          { title: 'Your Activity', cols: 1, rows: 1 },
          { title: 'Favorite', cols: 1, rows: 1 },
          { title: 'Your Target', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Recent Activity', cols: 2, rows: 1 },
        { title: 'Your Activity', cols: 1, rows: 1 },
        { title: 'Feeds', cols: 1, rows: 2 },
        { title: 'Transactions', cols: 1, rows: 1 },
      ];
    })
  );

  ngOnInit(): void {
    setTimeout(() => this.contextService.menus$.next(BaseMenus), 0);
  }
}
