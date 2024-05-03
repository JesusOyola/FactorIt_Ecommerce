import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ProductsListsComponent } from './productsLists/products-lists/products-lists.component';
import { CheckOutComponent } from './checkOut/check-out/check-out.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [LoginComponent, ProductsListsComponent, CheckOutComponent],
  imports: [CommonModule, PagesRoutingModule],
})
export class PagesModule {}
