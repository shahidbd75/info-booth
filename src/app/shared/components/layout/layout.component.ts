import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { GlobalDataContextService } from '../../services/global-data-context.service';
import { AuthDataService } from 'src/app/core/services/auth-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  private breakpointObserver = inject(BreakpointObserver);

  constructor(
    private router: Router,
    public authDataService: AuthDataService,
    public contextService: GlobalDataContextService
  ) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );

  onLogOutClick() {
    this.authDataService.logout();
    this.router.navigate(['login']);
  }
}
