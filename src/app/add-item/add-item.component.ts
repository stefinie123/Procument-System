import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { ItemsService} from '../services/ItemCatalogService/items.service';
import {Item} from '../item';
import {ItemCatalog} from '../itemCatalog';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  categories: string[] = ['Construction', 'Production', 'Maintainence'];
  category: string;
  item: ItemCatalog;
  name: string;
  price: number;

  constructor(private itemService: ItemsService, public snackBar: MatSnackBar) {
    this.category = '';
    this.item = {
      id: 0,
      name: '',
      price: 0,
      delivery_information: '',
      is_restricted: false
    };
    this.name = '';
    this.price = 0;
  }

  openSnackBar() {
    this.snackBar.open('Item Added Successfully', 'X', {
      duration: 5000,
    });
  }

  onAdd(): void{
    if (this.name !== '' && this.price !== 0 && this.category !== ''){
      this.item = {
        id: 0,
        name: this.name,
        price: this.price,
        delivery_information: '',
        is_restricted: false
      };
      this.addItem(this.item);
      this.name = '';
      this.price = 0;
      this.category = '';
    }
  }

  addItem(item: ItemCatalog): void{
    this.itemService.addItem(item).subscribe(data =>{
      console.log(data);
      this.openSnackBar();
    });
  }

  ngOnInit() {
  }

}
