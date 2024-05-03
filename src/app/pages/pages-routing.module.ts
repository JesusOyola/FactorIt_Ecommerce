import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterPathNames } from '../enum/router-path-names';
import { CheckOutComponent } from './checkOut/check-out/check-out.component';
import { LoginComponent } from './login/login.component';
import { ProductsListsComponent } from './productsLists/products-lists/products-lists.component';

const routes: Routes = [
  {
    path: RouterPathNames.login,
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: RouterPathNames.productsList,
    component: ProductsListsComponent,
    pathMatch: 'full',
  },
  {
    path: RouterPathNames.checkout,
    component: CheckOutComponent,
    pathMatch: 'full',
  },
  {
    path: RouterPathNames.empty,
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: RouterPathNames.any,
    component: LoginComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
