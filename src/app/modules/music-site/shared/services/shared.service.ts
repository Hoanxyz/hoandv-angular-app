import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private playSongEventSource =
    new BehaviorSubject<number>(-99);
  playSong$ = this.playSongEventSource.asObservable();

  private reloadSongsEventResource = new BehaviorSubject<boolean>(false);
  reloadListSongs$ = this.reloadSongsEventResource.asObservable();

  private appendListSongsEventResource = new BehaviorSubject<string>('ALL');
  appendListSongs$ = this.appendListSongsEventResource.asObservable();

  private addToFavSource = new Subject<void>();
  addToFav$ = this.addToFavSource.asObservable();


  constructor() { }

  emitPlaySongEvent(data: number): void {
    this.playSongEventSource.next(data);
  }

  emitReloadListSongsEvent(data: boolean): void {
    this.reloadSongsEventResource.next(data);
  }

  emitAppendListSongsEvent(data: string): void {
    this.appendListSongsEventResource.next(data);
  }

  emmitAddToFav() {
    this.addToFavSource.next();
  }
}
