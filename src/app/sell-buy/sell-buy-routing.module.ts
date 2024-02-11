import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './pages/items/items.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ItemComponent } from './pages/item/item.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BuyComponent } from './pages/buy/buy.component';
import { SellComponent } from './pages/sell/sell.component';
import { BuyListComponent } from './pages/buy-list/buy-list.component';
import { SellListComponent } from './pages/sell-list/sell-list.component';
import { SubCategoryComponent } from './pages/sub-category/sub-category.component';
import { SubCategoriesComponent } from './pages/sub-categories/sub-categories.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'items', component: ItemsComponent },
      { path: 'item/:{id}', component: ItemComponent },
      { path: 'item', component: ItemComponent },
      { path: 'sub-category', component: SubCategoryComponent },
      { path: 'sub-categories', component: SubCategoriesComponent },
      { path: 'buy-list', component: BuyListComponent },
      { path: 'sell-list', component: SellListComponent },
      { path: 'buy', component: BuyComponent },
      { path: 'sell', component: SellComponent },
      { path: '', redirectTo: 'items', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  exports: [RouterModule],
})
export class SellBuyRoutingModule {}
