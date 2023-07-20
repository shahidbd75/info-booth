import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './pages/items/items.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ItemComponent } from './pages/item/item.component';

const routes: Routes = [
  { path:'', component: LayoutComponent, children: [
    {path: 'items', component: ItemsComponent},
    {path: 'item', component: ItemComponent},
    {path: '', redirectTo: 'items', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellBuyRoutingModule { }
