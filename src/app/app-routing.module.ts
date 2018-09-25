import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddOrderComponent} from './add-order/add-order.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AddItemsComponent} from './add-items/add-items.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'add-order', component: AddOrderComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'add-items', component: AddItemsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
