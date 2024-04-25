import {Component, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import {ListPlay} from "../../shared/constants/music.constant";

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        pairwise()
      )
      .subscribe((event: any[]) => {
      });
  }

  ngOnInit(): void {
    localStorage.setItem("listPlay", ListPlay.ALL);
  }
}
