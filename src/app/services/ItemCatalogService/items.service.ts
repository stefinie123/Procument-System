import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';

import { ItemCatalog} from '../../itemCatalog';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
};

const httpOptions2 = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private itemsURL = '/api/catalogue/list'; // URL for the backend service

  constructor(private http: HttpClient) { }

  /** GET items catalogue from the server */
  getItems (): Observable<ItemCatalog[]> {
    return this.http.get<ItemCatalog[]>(this.itemsURL)
      .pipe(
        tap(items => console.log('fetched items')),
        catchError(this.handleError('getItems', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
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
