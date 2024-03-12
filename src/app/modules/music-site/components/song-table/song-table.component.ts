import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageAble} from "../../../../shared/models/models";
import {MusicService} from "../../shared/services/music.service";
import {SharedService} from "../../shared/services/shared.service";
import {ConfirmDialogComponent} from "../../../../shared/components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

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

  constructor(
    private musicService: MusicService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  searchSong() {
    this.musicService.searchSongs(this.pageAble).subscribe(
      (res) => {
        console.log(res);
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
}
