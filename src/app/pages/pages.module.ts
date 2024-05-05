import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ProductsListsComponent } from './productsLists/products-lists/products-lists.component';
import { CheckOutComponent } from './checkOut/check-out/check-out.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TitleTransformPipe } from '../pipes/title-transform.pipe';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [LoginComponent, ProductsListsComponent, CheckOutComponent,TitleTransformPipe],
  imports: [CommonModule,PagesRoutingModule,ReactiveFormsModule,SharedModule,],
})
export class PagesModule {}
