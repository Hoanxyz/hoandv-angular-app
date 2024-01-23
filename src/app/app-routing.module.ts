import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewYearModule} from "./modules/new-year/new-year.module";

const routes: Routes = [
  {
    path: 'new-year',
    loadChildren: () => import('./modules/new-year/new-year.module').then((m) => NewYearModule)
  },
  {
    path: '',
    redirectTo: 'new-year/intro',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
