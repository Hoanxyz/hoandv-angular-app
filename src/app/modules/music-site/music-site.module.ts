import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicSiteRoutingModule } from './music-site-routing.module';
import { ListSongsComponent } from './components/list-songs/list-songs.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RemoveExtensionPipe} from "../../shared/pipes/remove-extension.pipe";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ListSongsComponent,
    RemoveExtensionPipe
  ],
  imports: [
    CommonModule,
    MusicSiteRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ]
})
export class MusicSiteModule { }
