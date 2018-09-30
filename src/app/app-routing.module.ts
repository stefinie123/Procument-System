import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddOrderComponent} from './add-order/add-order.component';
import {DashboardComponent} from './dashboard/dashboard.component'
import {OrderListComponent} from './order-list/order-list.component';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {AddItemComponent} from './add-item/add-item.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'add-order', component: AddOrderComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'order-list', component: OrderListComponent},
  {path: 'detail/:id', component: OrderDetailsComponent},
  {path: 'add-item', component: AddItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
