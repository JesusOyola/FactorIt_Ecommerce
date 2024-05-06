import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductAmount } from 'src/app/interface/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-lists',
  templateUrl: './products-lists.component.html',
  styleUrls: ['./products-lists.component.scss'],
})
export class ProductsListsComponent implements OnInit, OnDestroy {
  listProducts: ProductAmount[] = [];
  urlImage: string =
    'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_';

  cartListProducts: ProductAmount[] = [];
  productServiceSubscription!: Subscription;
  cartServiceSubscription!: Subscription;
  clicksCounter: number = 0;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    document.querySelectorAll('[data-bs-toggle="tooltip"]');
    this.getAllProducts();
  }

  getAllProducts() {
    this.productServiceSubscription = this.productsService
      .getProducts()
      .subscribe({
        next: (data) => {
          console.log(data);
          this.listProducts = data;
        },
      });
  }

  findProductById(product: ProductAmount) {
    const indexx = this.cartListProducts.findIndex(
      (productFromCartList) =>
        productFromCartList.id_producto === product.id_producto
    );
    if (indexx !== -1) {
      this.cartListProducts[indexx].cantidad =
        (this.cartListProducts[indexx].cantidad as number) + 1;
    } else {
      product['cantidad'] = 1;
      this.cartListProducts.push(product);
    }
  }

  addToCartList(product: ProductAmount) {
    this.clicksCounter = this.clicksCounter + 1;
    const modifiedProduct = product;
    if (this.cartListProducts.length === 0) {
      modifiedProduct['cantidad'] = 1;
      this.cartListProducts.push(modifiedProduct);
    } else {
      this.findProductById(modifiedProduct);
    }
    this.cartService.setProducts(this.cartListProducts);
    this.cartService.setItemsIntoCart(this.clicksCounter);
  }

  ngOnDestroy(): void {
    this.productServiceSubscription.unsubscribe();
  }
}
