import {Component, Input} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AlertDialogComponent} from "../alert-dialog/alert-dialog.component";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {NavigationExtras, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../services/services.service";

@Component({
  selector: 'app-introduce-popup',
  templateUrl: './introduce-popup.component.html',
  styleUrls: ['./introduce-popup.component.scss'],
  animations: [
    trigger('textChange', [
      state('start',
        style({  })),
      state('end',
        style({  })),
      transition('start => end',
        [animate('0.6s linear', keyframes([
            style({ opacity: 0, offset: 0 }),
            style({ opacity: 0.5, offset: 0.5 }),
            style({ opacity: 1, offset: 1 }),
          ])
        )]
      ),
      transition('end => start',
        [animate('0.6s linear', keyframes([
            style({ opacity: 0, offset: 0 }),
            style({ opacity: 0.5, offset: 0.5 }),
            style({ opacity: 1, offset: 1 }),
          ])
        )]
      )
    ])
  ],
})

export class IntroducePopupComponent {

  @Input() url: string | undefined;
  @Input() users: any;
  @Input() avatars: any;
  isChangePos = false;
  changeImages = true;
  hiddenPopup = false;
  formLogin = this.fb.group({
    user: [
      '', [Validators.required]
    ]
  })

  constructor(
    public dialog: MatDialog,
    public router: Router,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
  }

  changePos() {
    this.changeImages = !this.changeImages;
    this.isChangePos = true;
  }

  letGo() {
    if (!this.isChangePos) {
      this.dialog.open(AlertDialogComponent, {
        data: {
          content: 'Xem điều bất ngờ trước đi bạn'
        }
      })
    } else {
      if (!this.formLogin.valid) {
        this.formLogin.markAllAsTouched();
        return;
      }
      this.hiddenPopup = true;
      const navigationExtra: NavigationExtras = {
        queryParams: {
          user: this.formLogin.get('user')?.value
        }
      }
      this.router.navigate([this.url], navigationExtra);
      // const user = this.formLogin.get('user')?.value;
      // if (this.apiService.validateUsername(typeof user === "string" ? user : 'unkown')) {
      // } else {
      //   this.dialog.open(AlertDialogComponent, {
      //     data: {
      //       content: 'Chú heo con điền sai thông tin rồi'
      //     }
      //   })
      // }
    }
  }
}
