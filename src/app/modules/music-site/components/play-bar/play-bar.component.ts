import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  listPlay = ListPlay;
  listPlayText =  {
    'ALL': 'Tất cả',
    'FAV': 'Yêu thích',
    'SEARCH': 'Tìm kiếm',
  };
  nameListPlay = "";
  codeListPlay = "";
  localStorage = localStorage;
  listSongPlayed = [];

  constructor(
    private sharedService: SharedService,
    private musicService: MusicService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.sharedService.appendListSongs$.subscribe(data => {
      localStorage.setItem("listPlay", data);
    });

    this.sharedService.playSong$.subscribe(data => {
      this.currentPlay = data;
      if (data >= 0) {
        this.getSongBase64AndPlay(data);
        // @ts-ignore
        this.codeListPlay = localStorage.getItem("listPlay");
        // @ts-ignore
        this.nameListPlay = this.codeListPlay ? this.listPlayText[this.codeListPlay] : "";
      }
    });

    this.isLogged = !!this.apiService.getCurrentUser();
  }

  handleAudioEnd() {
    switch (this.playMode) {
      case this.playModes.NoRepeat:
        break;
      case this.playModes.Repeat:
        this.playNextSong();
        break;
      case this.playModes.RepeatOne:
        this.audio.nativeElement.play();
        break;
    }
  }

  getSongAndPlay(id: number) {
    this.musicService.getSong(id).subscribe(
      (res) => {
        this.currentPlay = parseInt(id.toString());
        this.dataSong = res.body;
        const contentDisposition = res.headers.get('content-disposition');
        const subString = contentDisposition.split('=')[2];
        this.songPlayingName = subString.replace(/\\/g, '').replace(/"/g, '');
        this.prepareSourceToPlay(id);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getSongBase64AndPlay(id: number) {
    if (this.listSongPlayed[id]) {
      this.prepareSourceToPlay(id, true);
    } else {
      this.musicService.getSongBase64(id).subscribe(
        (res) => {
          this.currentPlay = parseInt(id.toString());
          this.songPlayingName = res.body.name;
          let base64Data = res.body.dataBase64;
          const binaryString = atob(base64Data);

          // Convert binary to ArrayBuffer
          const arrayBuffer = new ArrayBuffer(binaryString.length);
          const uint8Array = new Uint8Array(arrayBuffer);
          for (let i = 0; i < binaryString.length; i++) {
            uint8Array[i] = binaryString.charCodeAt(i);
          }

          this.dataSong = arrayBuffer;
          this.prepareSourceToPlay(id);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  prepareSourceToPlay(id: number, isExist = false) {
    let songUrl = "";
    if (isExist) {
      songUrl = this.listSongPlayed[id];
    } else {
      const audioBlob = new Blob([this.dataSong], { type: 'audio/mp3' });
      songUrl = URL.createObjectURL(audioBlob);
      // @ts-ignore
      this.listSongPlayed[id] = songUrl;
    }
    this.audioSource = songUrl;
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

  preSong() {
    const currentListPlay = localStorage.getItem("listPlay");
    if (this.currentPlay == -99) {
      return;
    }
    if (this.currentPlay) {
      if (currentListPlay == ListPlay.SEARCH) {
        return;
      } else if (currentListPlay == ListPlay.ALL) {
        this.musicService.findPreSong(this.currentPlay).subscribe(
          (res) => {
            this.getSongBase64AndPlay(res);
          },
          (error) => {
            console.log(error);
          }
        )
      } else {
        if (this.apiService.getCurrentUser()) {
          let listNumber: number[] = [];
          this.musicService.findFavSongIdsByUserId(this.apiService.getCurrentUser().id).subscribe(
            (res) => {
              listNumber = res;
              if (this.currentPlay) {
                const index = listNumber.indexOf(this.currentPlay);
                let nextItem;
                if (index == 0) {
                  nextItem = listNumber.length - 1;
                } else {
                  nextItem = index - 1;
                }
                this.getSongBase64AndPlay(listNumber[nextItem]);
              }
            },
            (err) => {
              console.log(err);
            }
          )
        }
      }
    }
  }

  nextSong() {
    this.playNextSong();
  }

  playNextSong() {
    const currentListPlay = localStorage.getItem("listPlay");
    if (this.currentPlay == -99) {
      return;
    }
    if (this.currentPlay) {
      if (currentListPlay == ListPlay.SEARCH) {
        return;
      } else if (currentListPlay == ListPlay.ALL) {
        this.musicService.findNextSong(this.currentPlay).subscribe(
          (res) => {
            this.getSongBase64AndPlay(res);
          },
          (error) => {
            console.log(error);
          }
        )
      } else {
        if (this.apiService.getCurrentUser()) {
          let listNumber: number[] = [];
          this.musicService.findFavSongIdsByUserId(this.apiService.getCurrentUser().id).subscribe(
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
                this.getSongBase64AndPlay(listNumber[nextItem]);
              }
            },
            (err) => {
              console.log(err);
            }
          )
        }
      }
    }
  }
}
