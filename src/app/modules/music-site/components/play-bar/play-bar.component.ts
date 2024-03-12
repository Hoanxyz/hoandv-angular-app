import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {SharedService} from "../../shared/services/shared.service";
import {MusicService} from "../../shared/services/music.service";

@Component({
  selector: 'app-play-bar',
  templateUrl: './play-bar.component.html',
  styleUrls: ['./play-bar.component.scss']
})
export class PlayBarComponent implements OnInit {
  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;
  songPlayingName = '';
  dataSong: any;
  audioSource = '';

  constructor(
    private sharedService: SharedService,
    private musicService: MusicService
  ) {}

  ngOnInit(): void {
    this.sharedService.playSong$.subscribe(data => {
      if (data.id >= 0) {
        this.musicService.getSong(data.id).subscribe(
          (res) => {
            console.log(res);
            this.dataSong = res;
            this.songPlayingName = data.name;
            this.prepareToPlay();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  prepareToPlay() {
    const audioBlob = new Blob([this.dataSong], { type: 'audio/mp3' });
    this.audioSource = URL.createObjectURL(audioBlob);
    setTimeout(() => {
      this.audio.nativeElement.play();
    }, 1000);
  }
}
