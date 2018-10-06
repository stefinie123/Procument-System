import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { Order} from '../order';
import { OrderService} from '../services/OrderService/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
//created a variable to hold the all  orders from the end point in the purchaseOrder controller http://localhost/8080/orders
 
  orders: Order[];

  displayedColumns: string[] = ['id', 'order_status', 'order_date', 'total', 'action'];
  dataSource = new MatTableDataSource(this.orders);

  constructor(private orderService: OrderService) {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getOrders(): void{
    this.orderService.getByManagerId(1).subscribe(data => {
      this.orders = data;
      console.log(this.orders)
      this.dataSource = new MatTableDataSource(this.orders);
    });
  }

  ngOnInit() {
    this.getOrders();
  }

}
