import {Component, Injectable, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
})

export interface Item {
  name: String;
}
@Injectable()
export class AddItemsComponent implements OnInit {

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>('http://localhost:8083/employers/');
  }

  getItem(name: string): Observable<Item> {
    return this.http.get<Item>('http://localhost:8083/employers/' + name);
  }

  insertItem(item: Item): Observable<Item> {
    return this.http.post<Item>('http://localhost:8000/api/cats/', item);
  }

  updateItem(item: Item): Observable<void> {
    return this.http.put<void>('http://localhost:8000/api/cats/' + item.name, item);
  }

  deleteItem(name: string) {
    return this.http.delete('http://localhost:8000/api/cats/' + name);
  }

  ngOnInit() {
  }

}
