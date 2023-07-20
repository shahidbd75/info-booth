import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellBuyRoutingModule } from './sell-buy-routing.module';
import { ItemsComponent } from './pages/items/items.component';
import { ItemComponent } from './pages/item/item.component';
import { LayoutComponent } from './pages/layout/layout.component';


@NgModule({
  declarations: [
    ItemsComponent,
    ItemComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    SellBuyRoutingModule
  ]
})
export class SellBuyModule { }
