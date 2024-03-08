import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MusicService} from "../../shared/services/music.service";

@Component({
  selector: 'app-list-songs',
  templateUrl: './list-songs.component.html',
  styleUrls: ['./list-songs.component.scss']
})

export class ListSongsComponent implements OnInit {
  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;
  selectedFile: File | null = null;
  listSongs: any;
  constructor(
    private musicService: MusicService
  ) {
  }

  data: any;
  audioSource: any;

  ngOnInit(): void {
    this.getAllSong();
  }

  getAllSong() {
    this.musicService.getAllSongs().subscribe(
      (res) => {
        console.log(res);
        this.listSongs = res;
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
      const audio = this.audio.nativeElement.play();
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

  playSong(id: number) {
    this.musicService.getSong(id).subscribe(
      (res) => {
        console.log(res);
        this.data = res;
        this.prepareToPlay();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
