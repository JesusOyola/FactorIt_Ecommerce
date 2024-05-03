import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterPathNames } from './enum/router-path-names';

const routes: Routes = [
  {
    path: RouterPathNames.empty,
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: RouterPathNames.any,
    redirectTo: RouterPathNames.empty,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
