import { Component } from '@angular/core';

@Component({
  selector: 'app-login-music',
  templateUrl: './login-music.component.html',
  styleUrls: ['./login-music.component.scss']
})
export class LoginMusicComponent {
  redirectLogin = "music/list-songs";
}
