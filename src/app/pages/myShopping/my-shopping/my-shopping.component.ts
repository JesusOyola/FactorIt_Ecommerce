import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouterPathNames } from 'src/app/enum/router-path-names';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-my-shopping',
  templateUrl: './my-shopping.component.html',
  styleUrls: ['./my-shopping.component.scss'],
})
export class MyShoppingComponent implements OnInit {
  loginServiceSubscription!: Subscription;
  userData: any;
  urlImage: string =
    'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_';
  myShopping: any[] = [];

  constructor(private loginService: LoginService, private router: Router) {}
  ngOnInit(): void {
    this.getCartType();
    this.reaorderProducts();
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
    }
  }
  reaorderProducts() {
    this.userData?.myShoppings.forEach((subArray: any[], index: number) => {
      subArray.forEach((elemento) => {
        console.log(elemento);
        this.myShopping.push(elemento);
      });
    });
  }
  goToProducstList() {
    this.router.navigate([`/${RouterPathNames.productsList}`]);
  }
}
