import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  form = this.fb.group({
    totalQuantity: [60, [Validators.required, Validators.max(100)]]
  })

  formData = this.fb.group({
    money: [null]
  })
  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    setInterval(() => {
      console.log(this.form.get('totalQuantity')?.value);
    }, 1000);
  }
}
