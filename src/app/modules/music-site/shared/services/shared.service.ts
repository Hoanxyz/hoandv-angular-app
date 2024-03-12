import { Injectable } from '@angular/core';
import {BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private playSongEventSource =
    new BehaviorSubject<{id: number, name: string}>({id: -1, name: ""});
  playSong$ = this.playSongEventSource.asObservable();

  private reloadSongsEventResource = new BehaviorSubject<boolean>(false);
  reloadListSongs$ = this.reloadSongsEventResource.asObservable();

  constructor() { }

  emitPlaySongEvent(data: {id: number, name: string}): void {
    this.playSongEventSource.next(data);
  }

  emitReloadListSongsEvent(data: boolean): void {
    this.reloadSongsEventResource.next(data);
  }
}
