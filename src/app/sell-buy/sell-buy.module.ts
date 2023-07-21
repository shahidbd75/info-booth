import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellBuyRoutingModule } from './sell-buy-routing.module';
import { ItemsComponent } from './pages/items/items.component';
import { ItemComponent } from './pages/item/item.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { MaterialModule } from '../lib/material/material.module';
import { BuyComponent } from './pages/buy/buy.component';
import { SellComponent } from './pages/sell/sell.component';
import { SellListComponent } from './pages/sell-list/sell-list.component';
import { BuyListComponent } from './pages/buy-list/buy-list.component';

@NgModule({
  declarations: [
    ItemsComponent,
    ItemComponent,
    LayoutComponent,
    BuyComponent,
    SellComponent,
    SellListComponent,
    BuyListComponent
  ],
  imports: [
    CommonModule,
    SellBuyRoutingModule,
    MaterialModule
  ]
})
export class SellBuyModule { }
