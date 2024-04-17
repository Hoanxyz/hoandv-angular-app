import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {SharedService} from "../../shared/services/shared.service";
import {MusicService} from "../../shared/services/music.service";
import {ListPlay, PlayMode} from "../../shared/constants/music.constant";
import {ApiService} from "../../../../shared/services/services.service";

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
  playMode = PlayMode.Repeat;
  playModes = PlayMode;
  iconPlayMode = 'repeat';
  currentPlay: number | undefined;
  isLogged = false;
  userId: number | undefined;

  constructor(
    private sharedService: SharedService,
    private musicService: MusicService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    console.log(this.playMode, this.iconPlayMode);
    this.sharedService.appendListSongs$.subscribe(data => {
      localStorage.setItem("listPlay", data);
    });

    this.sharedService.playSong$.subscribe(data => {
      this.currentPlay = data;
      if (data >= 0) {
        this.getSongAndPlay(data);
      }
    });

    this.isLogged = !!this.apiService.getCurrentUser();
    if (this.isLogged) {
      this.userId = this.apiService.getCurrentUser().id;
    }
  }

  handleAudioEnd() {
    const currentListPlay = localStorage.getItem("listPlay");
    switch (this.playMode) {
      case this.playModes.NoRepeat:
        break;
      case this.playModes.Repeat:
        if (this.currentPlay) {
          if (currentListPlay == ListPlay.SEARCH) {
            break;
          } else if (currentListPlay == ListPlay.ALL) {
            this.musicService.findNextSong(this.currentPlay).subscribe(
              (res) => {
                this.getSongAndPlay(res);
              },
              (error) => {
                console.log(error);
              }
            )
          } else {
            if (this.userId) {
              let listNumber: number[] = [];
              this.musicService.findFavSongIdsByUserId(this.userId).subscribe(
                (res) => {
                  listNumber = res;
                  if (this.currentPlay) {
                    const index = listNumber.indexOf(this.currentPlay);
                    let nextItem;
                    if (index == (listNumber.length - 1)) {
                      nextItem = 0;
                    } else {
                      nextItem = index + 1;
                    }
                    this.getSongAndPlay(listNumber[nextItem]);
                  }
                },
                (err) => {
                  console.log(err);
                }
              )
            }
          }
        }
        break;
      case this.playModes.RepeatOne:
        this.audio.nativeElement.play();
        break;
    }
  }

  getSongAndPlay(id: number) {
    this.musicService.getSong(id).subscribe(
      (res) => {
        console.log(res);
        this.currentPlay = parseInt(id.toString());
        this.dataSong = res.body;
        const contentDisposition = res.headers.get('content-disposition');
        const subString = contentDisposition.split('=')[2];
        this.songPlayingName = subString.replace(/\\/g, '').replace(/"/g, '');
        this.prepareSourceToPlay();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  prepareSourceToPlay() {
    const audioBlob = new Blob([this.dataSong], { type: 'audio/mp3' });
    this.audioSource = URL.createObjectURL(audioBlob);
    setTimeout(() => {
      this.audio.nativeElement.play();
    }, 1000);
  }

  changePlayType() {
    switch (this.playMode) {
      case this.playModes.NoRepeat:
        this.playMode = this.playModes.Repeat;
        this.iconPlayMode = 'repeat';
        break;
      case this.playModes.Repeat:
        this.playMode = this.playModes.RepeatOne;
        this.iconPlayMode = 'repeat_one';
        break;
      case this.playModes.RepeatOne:
        this.playMode = this.playModes.NoRepeat
        this.iconPlayMode = 'repeat';
        break;
    }
  }
}
