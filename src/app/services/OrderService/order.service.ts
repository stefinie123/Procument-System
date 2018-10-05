import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { Order} from '../../order';
import { catchError, map, tap} from 'rxjs/operators';
import {ItemCatalog} from '../../itemCatalog';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = '/api/orders';

  constructor(private http: HttpClient) { }

  addOrder (order: Order): Observable<{}> {
    return this.http.post<Order>(this.apiUrl + '/createOrder', order, httpOptions).pipe(
      tap(() => console.log(`added oder `)),
      catchError(this.handleError('addOrder'))
    );
  }

  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(this.apiUrl)
      .pipe(
        tap(orders => console.log(orders)),
        catchError(this.handleError('Get Orders', []))
      );
  }

  getOrder(id: number): Observable<Order> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Order>(url).pipe(
      tap(order => console.log(order)),
      catchError(this.handleError<Order>(`get id=${id}`))
    );
  }

  getByManagerId(id: number): Observable<Order[]> {
    return this.http.get<Order[]>('/api/managers/' + id.toString() + '/orders').pipe(
      tap(orders => console.log(orders)),
      catchError(this.handleError<Order[]>(`getOrderByManagerId id=${id}`))
    );
  }

  unapprovedOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl + '/unapproved').pipe(
      tap(orders => console.log(orders)),
      catchError(this.handleError<Order[]>(`getUnapprovedOrders`, []))
    );
  }

  approveOrder (id: number): Observable<{}> {
    return this.http.put<{}>(this.apiUrl + '/' + id.toString() + '/approveOrder', httpOptions).pipe(
      tap(() => console.log(`added oder `)),
      catchError(this.handleError('addOrder'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        console.log(`${operation} failed: ${error.message}`);

        //  Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
}
