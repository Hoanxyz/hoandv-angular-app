import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../../../shared/services/shared.service";

@Component({
  selector: 'app-header-music',
  templateUrl: './header-music.component.html',
  styleUrls: ['./header-music.component.scss']
})
export class HeaderMusicComponent implements OnInit {
  title: string = 'My Favorite Songs';
  logoutRedirect: string = 'music/login';
  openSearch = false;

  constructor(
    private sharedService: SharedService
  ) {
  }

  ngOnInit(): void {
    this.sharedService.toggleSearch$.subscribe(() => {
      this.openSearch = !this.openSearch;
    });
  }
}
