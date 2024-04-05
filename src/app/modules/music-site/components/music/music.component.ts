import {Component, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {
  constructor(private router: Router) {
    this.router.navigate(["music/list-songs"]);
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        pairwise()
      )
      .subscribe((event: any[]) => {
        console.log(event[0].urlAfterRedirects)
      });
  }

  ngOnInit(): void {
  }
}
