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
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from './services/category.service';
import { SubCategoryService } from './services/sub-category.service';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ItemService} from "./services/item.service";
import { SubCategoryComponent } from './pages/sub-category/sub-category.component';
import { SubCategoriesComponent } from './pages/sub-categories/sub-categories.component';
import {NgbootstrapModule} from "../lib/ngbootstrap/ngbootstrap.module";

@NgModule({
  declarations: [
    ItemsComponent,
    ItemComponent,
    LayoutComponent,
    BuyComponent,
    SellComponent,
    SellListComponent,
    BuyListComponent,
    SubCategoryComponent,
    SubCategoriesComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        SellBuyRoutingModule,
        MaterialModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgbootstrapModule
    ],
  providers: [CategoryService,SubCategoryService, ItemService]
})
export class SellBuyModule { }
