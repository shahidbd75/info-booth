import {Component, inject, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Observable} from "rxjs";
import {map, shareReplay} from "rxjs/operators";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit{
  navigation: Array<{text: string, link: string}>;
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit(): void {
    this.navigation = [
      {text: 'Sub Categories', link:'buy-sell/sub-categories'},
      {text: 'Persons', link: 'personnel/persons'},
      {text: 'Items', link: 'buy-sell'},
      {text: 'Buy', link: 'buy-sell/buy-list'},
      {text: 'Sell', link: 'buy-sell/sell-list'}
    ];
  }
}
