import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicSiteRoutingModule } from './music-site-routing.module';
import { ListSongsComponent } from './components/list-songs/list-songs.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    ListSongsComponent
  ],
    imports: [
      CommonModule,
      MusicSiteRoutingModule,
      MatButtonModule,
      MatIconModule
    ]
})
export class MusicSiteModule { }
