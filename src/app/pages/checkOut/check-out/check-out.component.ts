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
  cartListProducts!: ProductAmount[];
  urlImage: string =
    'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_';

  cartServiceSubscription!: Subscription;
  cartCounter!: number;
  totalAPagar!: number;

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
    this.getCartCounter();
    this.getTotalAmount();
  }

  getCartCounter() {
    this.cartService.getItemsIntoCart().subscribe({
      next: (data) => {
        this.cartCounter = data;
      },
    });
  }

  addItem(index: number) {
    console.log(index);

    if (index !== -1) {
      const originValue =
        this.cartListProducts[index].precio /
        (this.cartListProducts[index].cantidad as number);
      this.cartListProducts[index].cantidad =
        (this.cartListProducts[index].cantidad as number) + 1;

      this.cartListProducts[index].precio =
        originValue * (this.cartListProducts[index].cantidad as number);

      this.totalAPagar = this.totalAPagar + originValue;
    }

    const updateCartCounter = this.cartCounter + 1;
    this.cartService.setItemsIntoCart(updateCartCounter);
  }

  removeItem(index: number) {
    console.log(index);
    if (index !== -1) {
      const originValue =
        this.cartListProducts[index].precio /
        (this.cartListProducts[index].cantidad as number);
      this.cartListProducts[index].cantidad =
        (this.cartListProducts[index].cantidad as number) - 1;

      this.cartListProducts[index].precio =
        originValue * (this.cartListProducts[index].cantidad as number);
      this.totalAPagar = this.totalAPagar - originValue;
    }
    if (this.cartListProducts[index].cantidad === 0) {
      this.cartListProducts.splice(index, 1);
    }
    const updateCartCounter = this.cartCounter - 1;
    this.cartService.setItemsIntoCart(updateCartCounter);
  }

  getTotalAmount() {
    let total = 0;

    this.cartListProducts.forEach((product) => {
      total = total + product.precio;
    });
    this.totalAPagar = total;
  }
}
