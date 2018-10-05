import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { Supplier} from '../../supplier';
import { catchError, map, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class SupplierService {

  private apiUrl = '/api/suppliers';

  constructor(private http: HttpClient) { }

  addSupplier (sup: Supplier): Observable<{}> {
    return this.http.post<Supplier>(this.apiUrl + '/addSupplier', sup, httpOptions).pipe(
      tap(() => console.log(`added supplier `)),
      catchError(this.handleError('addSupplier'))
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
