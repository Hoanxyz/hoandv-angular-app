import {Component, ElementRef, ViewChild} from '@angular/core';
import {PageAble} from "../../../../shared/models/models";
import {SongTableComponent} from "../song-table/song-table.component";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @ViewChild(SongTableComponent) songTable!: SongTableComponent;
  pageAble: PageAble = {
    page: 0,
    size: 2,
    textSearch: '',
  }

  formSearch = this.fb.group({
    songName: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder
  ) {
  }

  searchSong() {
    this.formSearch.markAllAsTouched();
    if (this.formSearch.invalid) {
      return;
    }
    // @ts-ignore
    this.pageAble.textSearch = this.formSearch.get("songName")?.value;
    this.songTable.searchSong();
  }
}
