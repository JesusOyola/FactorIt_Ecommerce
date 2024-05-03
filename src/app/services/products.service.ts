import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../interface/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'https://static.compragamer.com/test/productos.json';
  }

  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.apiUrl);
  }
}
