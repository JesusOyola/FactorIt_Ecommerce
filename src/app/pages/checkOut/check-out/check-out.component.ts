import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { ProductAmount } from 'src/app/interface/products';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';

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
  userData: any;

  constructor(
    private cartService: CartService,
    private loginService: LoginService
  ) {}

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
    this.getCartType();
  }

  getCartCounter() {
    this.cartService.getItemsIntoCart().subscribe({
      next: (data) => {
        this.cartCounter = data;
      },
    });
  }

  getCartType() {
    let userEmail: string = '';
    this.loginService.getUser().subscribe({
      next: (data) => {
        userEmail = data;
      },
    });
    const userType = localStorage.getItem(userEmail);
    if (userType !== null) {
      this.userData = JSON.parse(userType);
      console.log(this.userData);
    }
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

  buyProducts(){
    if(this.userData.cartType === "common" && this.cartCounter === 4){
      this.totalAPagar = this.totalAPagar - ((this.totalAPagar * 25) / 100);
      console.log("Tuviste 25% de descuento")
      console.log(this.totalAPagar)
    }else if(this.userData.cartType === "common" && this.cartCounter > 10){
      this.totalAPagar = this.totalAPagar - 100;
      console.log("Tuviste 100 pesos de descuento")
      console.log(this.totalAPagar)
    }

     if(this.userData.cartType === "vip" && this.cartCounter > 10){
      const productoBarato = this.prodductoMasBarato();
      console.log(productoBarato)
      this.totalAPagar = (this.totalAPagar - productoBarato.precio) - 500;
    } 
    
  }

   prodductoMasBarato(){
    
    const cartListUpdated = this.cartListProducts.map(product =>({...product, precio:product.precio / (product.cantidad as number), cantidad:1}))
    const productoMenorPrecio = cartListUpdated.reduce((menorproducto, producto)=>{
      if(producto.precio < menorproducto.precio){
        return producto
      }else{
        return menorproducto
      }
    })
    return productoMenorPrecio
  } 
}
