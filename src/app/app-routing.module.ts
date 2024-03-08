import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewYearModule} from "./modules/new-year/new-year.module";
import {MusicSiteModule} from "./modules/music-site/music-site.module";

const routes: Routes = [
  {
    path: 'new-year',
    loadChildren: () => import('./modules/new-year/new-year.module').then((m) => NewYearModule)
  },
  {
    path: '',
    redirectTo: 'new-year/intro',
    pathMatch: 'full'
  },
  {
    path: 'list-songs',
    loadChildren: () => import('./modules/music-site/music-site.module').then((m) => MusicSiteModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
