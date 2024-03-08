import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListSongsComponent} from "./components/list-songs/list-songs.component";

const routes: Routes = [
  {
    path: '',
    component: ListSongsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusicSiteRoutingModule { }
