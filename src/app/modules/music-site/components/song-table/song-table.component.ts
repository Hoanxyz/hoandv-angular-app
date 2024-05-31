import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageAble} from "../../../../shared/models/models";
import {MusicService} from "../../shared/services/music.service";
import {SharedService} from "../../shared/services/shared.service";
import {ConfirmDialogComponent} from "../../../../shared/components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../../../shared/services/services.service";
import {ListPlay} from "../../shared/constants/music.constant";
import {ISongResponse} from "../../shared/models/music-models";

@Component({
  selector: 'app-song-table',
  templateUrl: './song-table.component.html',
  styleUrls: ['./song-table.component.scss']
})
export class SongTableComponent implements OnInit {
  @Input() pageAble!: PageAble;
  @Input() showDelete = true;
  @Input() playFromList = "ALL";
  @Input() classAdd = "";
  @Output() playSelectedSong = new EventEmitter<number>();
  listSongs: ISongResponse[] = [];
  totalSongs!: number;
  listFavSongs: number[] = [];
  isLogged = false;
  userId = -1;
  listPlay = ListPlay;
  currentSongPlay = 0;
  currentListPlay: string | null = '';

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
      this.userId = this.apiService.getCurrentUser().id;
      this.updateListFavSongs();
      this.sharedService.addToFav$.subscribe(() => {
        this.updateListFavSongs();
        if (this.playFromList == this.listPlay.FAV) {
          this.searchSong();
        }
      });
    }

    this.sharedService.playSongAuto$.subscribe(data => {
      this.currentSongPlay = data;
      this.currentListPlay = localStorage.getItem("listPlay");
    });

    this.sharedService.playSong$.subscribe(data => {
      this.currentSongPlay = data;
      this.currentListPlay = localStorage.getItem("listPlay");
    });
  }

  updateListFavSongs(): void {
    this.musicService.findFavSongIdsByUserId(this.userId).subscribe(
      (res) => {
        this.listFavSongs = res;
      },
      (err) => {
        console.log(err);
      }
    )
  }


  searchSong() {
    if (this.isLogged) {
      this.pageAble.userId = this.userId;
    }
    if (this.playFromList == this.listPlay.FAV) {
      if (this.isLogged) {
        this.musicService.getListFav(this.pageAble).subscribe(
          (res) => {
            this.listSongs = res.content;
            this.totalSongs = res.totalElements;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    } else {
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
  }

  playSong(id: number) {
    localStorage.setItem("listPlay", this.playFromList);
    this.sharedService.emitPlaySongEvent(id);
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
            this.sharedService.emmitAddToFav();
          }
        );
      }
    });
  }

  addToFavor(id: number) {
    const data = {
      userId: this.userId,
      songId: id
    }
    if (this.listFavSongs.includes(id)) {
      this.musicService.deleteFav(data).subscribe(
        (res) => {
          this.updateListFavSongs();
          if (this.playFromList == this.listPlay.FAV) {
            this.searchSong();
          }
          this.sharedService.emmitAddToFav();
        },
        (err) => {
          console.log(err);
        }
      )
    } else {
      this.musicService.addToFav(data).subscribe(
        (res) => {
          this.updateListFavSongs();
          if (this.playFromList == this.listPlay.FAV) {
            this.searchSong();
          }
          this.sharedService.emmitAddToFav();
        },
        (err) => {
          console.log(err);
        }
      )
    }
  }

  isFav(id: number): boolean {
    return this.listFavSongs.includes(id);
  }

  downloadSong(id: number) {
    let blobUrl = '';
    let songPlayingName = '';
    const link = document.createElement("a");
    this.musicService.getSong(id).subscribe(
      (res) => {
        const contentDisposition = res.headers.get('content-disposition');
        const subString = contentDisposition.split('=')[2];
        songPlayingName = subString.replace(/\\/g, '').replace(/"/g, '');
        const blob = new Blob([res.body], { type: "audio/mp3" });
        blobUrl = URL.createObjectURL(blob);
        link.href = blobUrl;
        link.download = songPlayingName;
        link.click();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
