import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {FormControl} from '@angular/forms';
import {Item} from '../item';
import { Order} from '../order';
import {ItemCatalog} from '../itemCatalog';
import { ItemsService } from '../services/ItemCatalogService/items.service';
import { OrderService} from '../services/OrderService/order.service';


@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  item: Item;
  items: Item[];
  order: Order;
  name: string;
  price: number;
  qty: number;
  unit: string;
  total: number;
  itemCatlog: ItemCatalog[];
  index: number;
  units: string[] = ['Kg', 'Cube', 'Metres'];
  date: Date;

  constructor(private itemService: ItemsService, private orderService: OrderService, public snackBar: MatSnackBar) {
    this.item = {
      name: '',
      price: 0,
      quantity: 0,
      unit: '',
      issued_quantity: 0
    };
    this.items = [];
    this.name = '';
    this.qty = 0;
    this.total = 0;
    this.unit = '';
    this.price = 0;
    this.order = {
      id: 0,
      sequential_ref: '',
      order_status: 'Pending',
      order_date: new Date(),
      default_order: true,
      on_hold: false,
      total: 0,
      site_manager: {id: 1},
      supplier: {id: 1},
      items: this.items
    };
  }

  openSnackBar() {
    this.snackBar.open('Order Placed Successfully', 'X', {
      duration: 5000,
    });
  }


  onAdd(): void{
    console.log(this.itemCatlog);
    console.log(this.item);
    if(this.name !== '' && this.qty !== 0){
      this.index = this.itemCatlog.findIndex(itemCat => itemCat.name === this.name);
      this.price = this.itemCatlog[this.index].price;
      console.log(this.price.toString());
      this.item = {
        name: this.name,
        price: this.price,
        quantity: this.qty,
        unit: this.unit,
        issued_quantity: 0
      };
      console.log('Pushing');
      this.items.push(this.item);
      this.calcTotal();
      console.log(this.items);
      this.name = '';
      this.qty = 0;
    }
    // console.log(this.items)

  }

  getSeqRef(): string {
    let ref = 'P' + Math.random().toString(36).substr(2, 9);
    return ref.toUpperCase();
  }

  onPlace(): void {
    this.date = new Date();
    // this.order.sequential_ref = this.getSeqRef();
    // this.order.total = this.total;
    // this.order.items = this.items;
    // this.order.order_date = this.date.getFullYear().toString() + '-' + this.date.getMonth().toString() + '-' + this.date.getDate().toString();
    this.order = {
      id: 0,
      sequential_ref: this.getSeqRef(),
      order_status: 'Pending',
      //order_date: this.date.getFullYear().toString() + '-' + this.date.getMonth().toString() + '-' + this.date.getDate().toString(),
      order_date: new Date(),
      default_order: true,
      on_hold: false,
      total:  this.total,
      site_manager: {id: 1},
      supplier: {id: 1},
      items: this.items
    };
    console.log(this.order);
    this.placeOrder(this.order);
    this.name = '';
    this.qty = 0;
    this.items = [];
  }

  calcTotal(): void{
    console.log('calculating total');
    this.total = 0;
    this.items.forEach(item =>{
      this.index = this.itemCatlog.findIndex(itemCat => itemCat.name === item.name);
      console.log(this.index);
      this.total += (this.itemCatlog[this.index].price * item.quantity);
    });
  }

  getItemsCatalog(): void{
    this.itemService.getItems().subscribe(items => this.itemCatlog = items);
  }

  placeOrder(order: Order): void{
    this.orderService.addOrder(order).subscribe(data => {
      console.log(data);
      this.openSnackBar();
    });
  }
  ngOnInit() {
    this.getItemsCatalog();
  }

}
