import {
  AfterContentChecked,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RouterPathNames } from 'src/app/enum/router-path-names';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterContentChecked {
  @Output() emitFullDate: EventEmitter<string> = new EventEmitter();
  @Output() emitMonth: EventEmitter<number> = new EventEmitter();
  model!: NgbDateStruct;
  cartItemsAmount: number = 0;
  isInChekOutPage: boolean = false;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.showNavbar();
  }

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

  showNavbar() {
    if (this.router.url === '/checkout') this.isInChekOutPage = true;
  }
  sendSelectedDate() {
    if (this.model !== null) {
      const stringDate = `${this.model.day}/${this.model.month}/${this.model.year}`;
      this.emitFullDate.emit(stringDate);
     this.emitMonth.emit(this.model.month)
    }
  }
}
