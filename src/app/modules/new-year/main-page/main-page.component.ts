import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  user: string | undefined;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['user']) {
        this.user = params['user'];
      } else {
        this.router.navigate(['new-year/intro']);
      }
    })
  }
}
