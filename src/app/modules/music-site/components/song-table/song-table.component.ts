import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageAble} from "../../../../shared/models/models";
import {MusicService} from "../../shared/services/music.service";
import {SharedService} from "../../shared/services/shared.service";
import {ConfirmDialogComponent} from "../../../../shared/components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../../../shared/services/services.service";

@Component({
  selector: 'app-song-table',
  templateUrl: './song-table.component.html',
  styleUrls: ['./song-table.component.scss']
})
export class SongTableComponent implements OnInit {
  @Input() pageAble!: PageAble;
  @Input() showDelete = true;
  @Output() playSelectedSong = new EventEmitter<number>();
  listSongs: any;
  totalSongs!: number;
  listFavSongs: string[] = [];
  isLogged = false;

  constructor(
    private musicService: MusicService,
    private sharedService: SharedService,
    public dialog: MatDialog,
    public apiService: ApiService,
  ) {
  }

  ngOnInit(): void {
    this.isLogged = !!this.apiService.getCurrentUser();
    if (this.isLogged) {
      this.getListFav();
    }
  }

  getListFav() {
    this.listFavSongs = this.apiService.getCurrentUser().songIds.split(",");
  }

  searchSong() {
    this.musicService.searchSongs(this.pageAble).subscribe(
      (res) => {
        this.listSongs = res.content;
        this.totalSongs = res.totalElements;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  playSong(id: number, name: string) {
    this.sharedService.emitPlaySongEvent({id: id, name: name});
  }

  changePage(evt: any) {
    this.pageAble.page = evt.pageIndex;
    this.pageAble.size = evt.pageSize;
    this.searchSong();
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {title: 'Xác nhận xóa'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.musicService.deleteSong(id).subscribe(
          (res) => {
            this.sharedService.emitReloadListSongsEvent(true);
          }
        );
      }
    });
  }

  addToFavor(id: string) {
    const currentUser = this.apiService.getCurrentUser();
    let newFavList;
    const songIds = currentUser.songIds;
    if (songIds) {
      let listSongIds = songIds.split(',');
      if (listSongIds.includes(id.toString())) {
        // remove song
        listSongIds = listSongIds.filter(function(item: any) {
          return item !== id.toString();
        })

        newFavList = listSongIds.join(",");
      } else {
        // add song
        newFavList = songIds + `,${id}`;
      }
    } else {
      newFavList = `${id}`;
    }
    currentUser.songIds = newFavList;
    this.apiService.updateUser(currentUser, currentUser.id).subscribe(
      (res) => {
        localStorage.setItem('currentUser', JSON.stringify(res));
      },
      (err) => {
        console.log(err);
      }
    );
  }

  isFav(id: string): boolean {
    this.getListFav();
    return this.listFavSongs.includes(id.toString());
  }
}
