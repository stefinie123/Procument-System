import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../item';
import {ItemCatalog} from '../itemCatalog';
import { ItemsService } from '../services/ItemCatalogService/items.service';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  @Input() items: Item[];
  @Input() total: number;
  index: number;
  itemCatlog: ItemCatalog[];
  constructor(private itemService: ItemsService) {
    this.total = 0;
  }

  onRemove(item: Item): void{
    this.index = this.items.indexOf(item);
    this.items.splice(this.index, 1);
    this.calcTotal();
  }

  getItemsCatalog(): void{
    this.itemService.getItems().subscribe(items => this.itemCatlog = items);
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

  ngOnInit() {
    this.getItemsCatalog();
  }

}
