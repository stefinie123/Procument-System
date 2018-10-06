import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { Order} from '../order';
import { OrderService} from '../services/OrderService/order.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-approve-order',
  templateUrl: './approve-order.component.html',
  styleUrls: ['./approve-order.component.css']
})
export class ApproveOrderComponent implements OnInit {
//created a variable to hold the all unapproved orders from the end point in the purchaseOrder controller http://localhost/8080/orders/unapproved.
  //it returns set of unapproved orders
  orders: Order[];

  displayedColumns: string[] = ['id', 'order_status', 'order_date', 'total', 'action'];
  dataSource = new MatTableDataSource(this.orders);

  constructor(private orderService: OrderService, public snackBar: MatSnackBar) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openSnackBar() {
    this.snackBar.open('Order Approved!', 'X', {
      duration: 5000,
    });
  }

  getOrders(): void{
    this.orderService.unapprovedOrders().subscribe(data => {
      this.orders = data;
      console.log(this.orders)
      this.dataSource = new MatTableDataSource(this.orders);
    });
  }

  approveOrder(id: number){
    this.orderService.approveOrder(id).subscribe(() => {
      this.openSnackBar();
      this.getOrders()
    });
  }

  ngOnInit() {
    this.getOrders();
  }

}
