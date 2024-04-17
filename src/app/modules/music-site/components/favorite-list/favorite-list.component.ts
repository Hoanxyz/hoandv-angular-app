import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SongTableComponent} from "../song-table/song-table.component";
import {SharedService} from "../../shared/services/shared.service";
import {PageAble} from "../../../../shared/models/models";
import {MusicService} from "../../shared/services/music.service";
import {ListPlay} from "../../shared/constants/music.constant";

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent implements OnInit, AfterViewInit {
  @ViewChild(SongTableComponent) songTable!: SongTableComponent;
  listPlay = ListPlay;
  pageAble: PageAble = {
    page: 0,
    size: 5,
    textSearch: '',
    ids: []
  }

  constructor(
    private sharedService: SharedService,
    private musicService: MusicService
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.songTable.searchSong();
  }
}
