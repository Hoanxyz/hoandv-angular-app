import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MusicService} from "../../shared/services/music.service";
import {PageAble} from "../../../../shared/models/models";
import {SongTableComponent} from "../song-table/song-table.component";
import {SharedService} from "../../shared/services/shared.service";
import {MatDialog} from "@angular/material/dialog";
import {AlertDialogComponent} from "../../../../shared/components/alert-dialog/alert-dialog.component";

@Component({
  selector: 'app-list-songs',
  templateUrl: './list-songs.component.html',
  styleUrls: ['./list-songs.component.scss']
})

export class ListSongsComponent implements OnInit, AfterViewInit {
  @ViewChild(SongTableComponent) songTable!: SongTableComponent;
  selectedFile: File | null = null;
  pageAble: PageAble = {
    page: 0,
    size: 2,
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
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (event.target.files[0].size >= 20000000)
    this.dialog.open(AlertDialogComponent, {
      data: {
        content: 'Cho cái file be bé thôi (<30MB)'
      }
    })
  }

  onUpload(): void {
    if (this.selectedFile && (this.selectedFile.size < 30000000)) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.musicService.uploadSong(formData).subscribe(
        (response) => {
          console.log('File uploaded successfully.');
          this.songTable.searchSong();
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    }
  }
}
