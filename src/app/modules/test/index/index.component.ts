import {Component, OnInit} from '@angular/core';
import {AdItem} from "../banner/ad-item";
import {AdService} from "../banner/ad.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  ads!: AdItem[];

  constructor(
    private adService: AdService,
  ) {}

  ngOnInit() {
    this.ads = this.adService.getAds();
  }
}
