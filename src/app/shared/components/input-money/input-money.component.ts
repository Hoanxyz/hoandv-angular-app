import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-input-money',
  templateUrl: './input-money.component.html',
  styleUrls: ['./input-money.component.scss']
})
export class InputMoneyComponent {

  @ViewChild('moneyInput', {static: true}) moneyInput!: ElementRef;
  @Input() control!: FormControl;

  changeData(): void {
    this.moneyInput.nativeElement.value = this.splitString(this.moneyInput.nativeElement.value).join('.');
    this.control.setValue(this.moneyInput.nativeElement.value.replaceAll('.', ''));
  }

  keyUpEvent(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End'];
    const isNumericInput = (event.key >= '0' && event.key <= '9');
    const isAllowedKey = allowedKeys.includes(event.key);

    if (!isNumericInput && !isAllowedKey) {
      event.preventDefault();
    }
  }

  splitString(value: string): string[] {
    const removeDot = value.replaceAll('.', '');
    const result: string[] = [];
    let currentIndex = removeDot.length;

    while (currentIndex > 0) {
      const startIndex = Math.max(0, currentIndex - 3);
      const substring = removeDot.substring(startIndex, currentIndex);
      result.unshift(substring);
      currentIndex -= 3;
    }
    return result;
  }
}
