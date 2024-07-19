import {Component, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import {ListPlay} from "../../shared/constants/music.constant";
import {SharedService as RootSharedService} from "../../../../shared/services/shared.service";
import {SharedService} from "../../shared/services/shared.service";
import {ApiService} from "../../../../shared/services/services.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {

  window = window;
  formData = this.fb.group({
    money: [null]
  })

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private rootShareService: RootSharedService,
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.apiService.checkTokenValid().subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
        if(error.status == '403') {
          localStorage.removeItem('currentUser');
          localStorage.removeItem('authToken');
        }
      }
    )
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

  show(): void {
    console.log(this.formData.getRawValue());
  }
}
