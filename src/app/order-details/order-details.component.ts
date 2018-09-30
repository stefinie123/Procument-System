import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { OrderService} from '../services/OrderService/order.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Order} from '../order';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order: Order;
  displayedColumns: string[] = ['name', 'quantity'];
  dataSource = new MatTableDataSource([]);

  constructor(private route: ActivatedRoute, private location: Location, private orderService: OrderService) { }

  getOrder(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.orderService.getOrder(id)
      .subscribe(order => {
        this.order = order;
        console.log(order.items);
        this.dataSource = new MatTableDataSource(order.items);
      });
  }

  //date = new FormControl(new Date());
  //serializedDate = new FormControl((new Date()).toISOString());
  ngOnInit() {
    this.getOrder();
  }

}
