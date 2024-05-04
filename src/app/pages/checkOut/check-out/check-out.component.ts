import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { ProductAmount } from 'src/app/interface/products';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit {
  cartListProducts: ProductAmount[] | undefined;
  urlImage: string =
    'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_';

  cartServiceSubscription!: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService
      .getProducts()
      .pipe(
        map((products) => {
          return products.map((product) => {
            const cantidad = product.cantidad ?? 1;
            return { ...product, precio: product.precio * cantidad };
          });
        })
      )
      .subscribe({
        next: (modifiedProducts) => {
          this.cartListProducts = modifiedProducts;
          console.log(modifiedProducts);
        },
      });
  }
}
