import { AfterContentChecked, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RouterPathNames } from 'src/app/enum/router-path-names';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements AfterContentChecked {
  cartItemsAmount: number = 0;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private cartService: CartService
  ) {}

  goToCart() {
    this.router.navigate([`/${RouterPathNames.checkout}`]);
  }

  ngAfterContentChecked(): void {
    this.cartService.getItemsIntoCart().subscribe({
      next: (data) => {
        this.cartItemsAmount = data;
      },
    });
  }
  
}
