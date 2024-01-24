import {Component, Input, OnInit} from '@angular/core';
import {LuckyMoney} from "../../../shared/datas/datas";

@Component({
  selector: 'app-lucky-money',
  templateUrl: './lucky-money.component.html',
  styleUrls: ['./lucky-money.component.scss']
})
export class LuckyMoneyComponent implements OnInit {
  @Input() user: string | undefined;
  open = false;
  content: string | undefined;

  toggle() {
    this.open = !this.open;
  }

  ngOnInit(): void {
    // @ts-ignore
    this.content = LuckyMoney[this.user];
    console.log(this.content);
  }
}
