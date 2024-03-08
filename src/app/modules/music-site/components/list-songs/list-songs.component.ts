import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MusicService} from "../../shared/services/music.service";
import {PageAble} from "../../../../shared/models/models";

@Component({
  selector: 'app-list-songs',
  templateUrl: './list-songs.component.html',
  styleUrls: ['./list-songs.component.scss']
})

export class ListSongsComponent implements OnInit {
  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;
  selectedFile: File | null = null;
  listSongs: any;
  listSearchSongs: any;
  songPlayingName: string = '';
  pageAble: PageAble = {
    page: 0,
    size: 2
  }
  currentPage = 0;
  totalSongs!: number;
  totalPages!: number;
  searchText!: '';
  constructor(
    private musicService: MusicService
  ) {
  }

  data: any;
  audioSource: any;

  ngOnInit(): void {
    this.getAllSong();
    this.getSong(this.pageAble);
  }

  getAllSong() {
    this.musicService.getAllSongs().subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getSong(pageable: PageAble) {
    this.musicService.getSongs(pageable).subscribe(
      (res) => {
        console.log(res);
        this.listSongs = res.content;
        this.totalSongs = res.totalElements;
        this.totalPages = res.totalPages;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  prepareToPlay() {
    const audioBlob = new Blob([this.data], { type: 'audio/mp3' });
    this.audioSource = URL.createObjectURL(audioBlob);
    setTimeout(() => {
      this.audio.nativeElement.play();
    }, 1000);
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.musicService.uploadSong(formData).subscribe(
        (response) => {
          console.log('File uploaded successfully.');
          this.getAllSong();
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    }
  }

  playSong(id: number, name: string) {
    this.musicService.getSong(id).subscribe(
      (res) => {
        console.log(res);
        this.data = res;
        this.songPlayingName = name;
        this.prepareToPlay();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  changePage(evt: any) {
    this.pageAble.page = evt.pageIndex;
    this.currentPage = evt.pageIndex;
    this.getSong(this.pageAble);
  }

  searchSong() {
    this.musicService.searchSongs({page: 0, size: 2, text: this.searchText}).subscribe(
      (res) => {
        console.log(res);
        this.listSearchSongs = res.content;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
