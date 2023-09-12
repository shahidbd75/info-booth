import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { PersonnelModule } from '../personnel/personnel.module';
import { ItemDataService } from './services/item-data.service';
import { SharedModule } from '../shared/shared.module';
import { GlobalDataContextService } from '../shared/services/global-data-context.service';
import { VillageModule } from '../shared/modules/village-select/village.module';
import { VillageSelectComponent } from '../shared/modules/village-select/village-select.component';

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
    SubCategoriesComponent,
  ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        SellBuyRoutingModule,
        MaterialModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgbootstrapModule,
        PersonnelModule,
        VillageModule
    ],
  providers: [CategoryService,SubCategoryService, ItemService, ItemDataService, GlobalDataContextService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SellBuyModule { }
