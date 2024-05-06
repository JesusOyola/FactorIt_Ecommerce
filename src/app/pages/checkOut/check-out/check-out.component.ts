import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, of, Subscription, switchMap } from 'rxjs';
import { RouterPathNames } from 'src/app/enum/router-path-names';
import { ProductAmount } from 'src/app/interface/products';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit, OnDestroy {
  cartListProducts!: ProductAmount[];
  urlImage: string =
    'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_';

  cartServiceSubscription!: Subscription;
  loginServiceSubscription!: Subscription;
  cartCounter!: number;
  totalAPagar!: number;
  userData: any;
  dateSelected: string = '';
  monthSelected: number = 0;
  specialDate: string = '25/12/2024';
  specialMonthVip: number = 7;
  discountMessage:string = "";

  constructor(
    private cartService: CartService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartServiceSubscription = this.cartService
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
    this.cartServiceSubscription = this.cartService
      .getItemsIntoCart()
      .subscribe({
        next: (data) => {
          this.cartCounter = data;
        },
      });
  }

  getCartType() {
    let userEmail: string = '';
    this.loginServiceSubscription = this.loginService.getUser().subscribe({
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
  goToProducstList() {
    this.router.navigate([`/${RouterPathNames.productsList}`]);
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

  buyProducts() {
    if (
      this.userData?.cartType === 'common' &&
      this.dateSelected === this.specialDate &&
      this.cartCounter > 10
    ) {
      this.totalAPagar = this.totalAPagar - 300;
      console.log('Tuviste 300 de descuento');
      this.discountMessage = 'Tuviste 300 de descuento'
      console.log(this.totalAPagar);
    } else if (this.userData?.cartType === 'common' && this.cartCounter === 4) {
      this.totalAPagar = this.totalAPagar - (this.totalAPagar * 25) / 100;
      console.log('Tuviste 25% de descuento');
      this.discountMessage = 'Tuviste 25% de descuento'
      console.log(this.totalAPagar);
    } else if (
      this.userData?.cartType === 'common' &&
      this.cartCounter < 4 &&
      this.totalAPagar > 1000000
    ) {
      const user = this.userData.email;
      localStorage.removeItem(user);
      const userUpdated: any = {
        email: this.userData.email,
        password: this.userData.password,
        cartType: 'vip',
        vipNextPurchase: false,
      };
      const userTransformData = JSON.stringify(userUpdated);
      localStorage.setItem(user, userTransformData);
      console.log('Felicidades te convertiste en un cliente VIP');
      this.discountMessage = 'Felicidades te convertiste en un cliente VIP'
      
    } else if (
      this.userData?.cartType === 'common' &&
      this.monthSelected === this.specialMonthVip &&
      this.cartCounter > 10 &&
      this.totalAPagar > 10000
    ) {
      const user = this.userData.email;
      localStorage.removeItem(user);
      const userUpdated: any = {
        email: this.userData.email,
        password: this.userData.password,
        cartType: 'vip',
        vipNextPurchase: true,
      };
      const userTransformData = JSON.stringify(userUpdated);
      localStorage.setItem(user, userTransformData);

      console.log('Vas a ser considerado VIP en la siguiente compra');
      this.discountMessage = 'Vas a ser considerado VIP en la siguiente compra'
    } else if (this.userData?.cartType === 'common' && this.cartCounter > 10) {
      this.totalAPagar = this.totalAPagar - 100;
      console.log('Tuviste 100 pesos de descuento');
      this.discountMessage = 'Tuviste 100 pesos de descuento'
      console.log(this.totalAPagar);
    } else {
      console.log('No se aplico ningun descuento');
      this.discountMessage = 'No se aplico ningun descuento'
    }

    if (this.userData?.cartType === 'vip' && this.cartCounter > 10) {
      const productoBarato = this.prodductoMasBarato();
      console.log(productoBarato);
      this.totalAPagar = this.totalAPagar - productoBarato.precio - 500;
      this.discountMessage = `Tuviste una bonificaciòn de ${productoBarato.precio} y una bonificacion extra de 500`
      if (this.userData.vipNextPurchase === true) {
        const user = this.userData.email;
        localStorage.removeItem(user);
        const userUpdated: any = {
          email: this.userData.email,
          password: this.userData.password,
          cartType: 'common',
          vipNextPurchase: false,
        };
        const userTransformData = JSON.stringify(userUpdated);
        localStorage.setItem(user, userTransformData);
      }
    }

    console.log('MI COMPRA', this.cartListProducts);
    let shopings = this.userData?.myShoppings;
    console.log(shopings);
    const user = this.userData?.email;
    localStorage.removeItem(user);
    let userUpdated: any = {
      email: this.userData?.email,
      password: this.userData?.password,
      cartType: 'common',
      vipNextPurchase: false,
      myShoppings: [],
    };

    shopings.push(this.cartListProducts);
    userUpdated.myShoppings = [...shopings];

    const userTransformData = JSON.stringify(userUpdated);
    localStorage.setItem(user, userTransformData);

    this.showAlertConfirmPurchase();
  }

  prodductoMasBarato() {
    const cartListUpdated = this.cartListProducts.map((product) => ({
      ...product,
      precio: product.precio / (product.cantidad as number),
      cantidad: 1,
    }));
    const productoMenorPrecio = cartListUpdated.reduce(
      (menorproducto, producto) => {
        if (producto.precio < menorproducto.precio) {
          return producto;
        } else {
          return menorproducto;
        }
      }
    );
    return productoMenorPrecio;
  }

  onSelectedDate(date: string) {
    this.dateSelected = date;
  }

  onSelectedMonth(month: number) {
    this.monthSelected = month;
  }

  deleteAllCart() {
    this.cartListProducts = [];
    this.cartService.setItemsIntoCart(0);
    this.router.navigate([`/${RouterPathNames.productsList}`]);
  }

  showAlertConfirmPurchase() {
    Swal.fire({
      icon: 'success',
      title: 'Compra Exitosa!',
      text: this.discountMessage,
      showConfirmButton: false,
      timer: 5000,
    });
    this.router.navigate([`/${RouterPathNames.productsList}`]);
  }

  ngOnDestroy(): void {
    console.log('destruido');
    this.cartListProducts = [];
    this.cartService.setProducts([]);
    this.cartService.setItemsIntoCart(0);
    this.cartServiceSubscription.unsubscribe();
    this.loginServiceSubscription.unsubscribe();
  }
}
