import { Component } from '@angular/core';

@Component({
  selector: 'app-header-music',
  templateUrl: './header-music.component.html',
  styleUrls: ['./header-music.component.scss']
})
export class HeaderMusicComponent {
  title: string = 'My Favorite Songs';
  logoutRedirect: string = 'music/login';
}
