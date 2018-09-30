import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';
import { Category} from '../../category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }
}
