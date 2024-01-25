import {Component, Input, OnInit} from '@angular/core';
import {LuckyMoney} from "../../../shared/datas/datas";

@Component({
  selector: 'app-lucky-money',
  templateUrl: './lucky-money.component.html',
  styleUrls: ['./lucky-money.component.scss']
})
export class LuckyMoneyComponent implements OnInit {
  @Input() userCode!: string;
  open = false;
  content!: string;

  toggle() {
    this.open = !this.open;
  }

  ngOnInit(): void {
    this.content = LuckyMoney[this.userCode as keyof typeof LuckyMoney];
  }
}
