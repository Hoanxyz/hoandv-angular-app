import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MusicService} from "../../shared/services/music.service";
import {PageAble} from "../../../../shared/models/models";
import {SongTableComponent} from "../song-table/song-table.component";
import {SharedService} from "../../shared/services/shared.service";
import {MatDialog} from "@angular/material/dialog";
import {AlertDialogComponent} from "../../../../shared/components/alert-dialog/alert-dialog.component";
import {ListPlay} from "../../shared/constants/music.constant";

@Component({
  selector: 'app-list-songs',
  templateUrl: './list-songs.component.html',
  styleUrls: ['./list-songs.component.scss']
})

export class ListSongsComponent implements OnInit, AfterViewInit {
  @ViewChild(SongTableComponent) songTable!: SongTableComponent;
  @ViewChild('uploadSong') uploadSong!: ElementRef<HTMLInputElement>;
  selectedFile: File | null = null;
  listPlay = ListPlay;
  pageAble: PageAble = {
    page: 0,
    size: 5,
    textSearch: '',
  }
  constructor(
    private musicService: MusicService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) {
  }

  ngAfterViewInit(): void {
    this.songTable.searchSong();
  }

  ngOnInit(): void {
    this.sharedService.reloadListSongs$.subscribe(data => {
      if (data) {
        this.songTable.searchSong();
      }
    })

    this.musicService.getPosts().subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (event.target.files[0].size >= 40000000)
    this.dialog.open(AlertDialogComponent, {
      data: {
        content: 'Cho cái file be bé thôi (<40MB)'
      }
    })
  }

  onUpload(): void {
    if (this.selectedFile && (this.selectedFile.size < 40000000)) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.musicService.uploadSong(formData).subscribe(
        (response) => {
          this.songTable.searchSong();
          this.uploadSong.nativeElement.value = "";
          this.selectedFile = null;
          this.dialog.open(AlertDialogComponent, {
            data: {
              content: 'Upload bài hát thành công'
            }
          });
        },
        (error) => {
          this.dialog.open(AlertDialogComponent, {
            data: {
              content: error
            }
          });
        }
      );
    }
  }
}
