import { Injectable } from '@angular/core';
import { ProductAmount } from '../interface/products';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private products$: BehaviorSubject<ProductAmount[]>;
  private itemsIntoCart$: BehaviorSubject<number>;
  constructor() {
    this.products$ = new BehaviorSubject<ProductAmount[]>([]);
    this.itemsIntoCart$ = new BehaviorSubject<number>(0);
  }

  getProducts() {
    return this.products$.asObservable();
  }

  setProducts(products: ProductAmount[]) {
    this.products$.next(products);
  }


  getItemsIntoCart() {
    return this.itemsIntoCart$.asObservable();
  }

  setItemsIntoCart(items: number) {
    this.itemsIntoCart$.next(items);
  }
}
