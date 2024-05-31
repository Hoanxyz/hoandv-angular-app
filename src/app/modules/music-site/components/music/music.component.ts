import {Component, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import {ListPlay} from "../../shared/constants/music.constant";
import {SharedService as RootSharedService} from "../../../../shared/services/shared.service";
import {SharedService} from "../../shared/services/shared.service";
import {MusicService} from "../../shared/services/music.service";
import {ApiService} from "../../../../shared/services/services.service";

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {

  window = window;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private rootShareService: RootSharedService,
  ) {
    this.rootShareService.logout$.subscribe(
      () => {
        this.sharedService.emitPlaySongEvent(-99);
      }
    );

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        pairwise()
      )
      .subscribe((event: any[]) => {
      });
  }

  ngOnInit(): void {
    this.rootShareService.logout$.subscribe(
      () => {
        this.sharedService.emitPlaySongEvent(-99);
      }
    )

    localStorage.setItem("listPlay", ListPlay.ALL);
    const currentUrl = window.location.href;
    if (currentUrl.endsWith('music')) {
      this.router.navigate(["music/list-songs"]);
    }
  }
}
