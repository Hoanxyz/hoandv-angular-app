import {Component, Input} from '@angular/core';
import {Avatar, User} from "../../models/models";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AlertDialogComponent} from "../alert-dialog/alert-dialog.component";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {ApiService} from "../../services/services.service";

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss'],
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
export class LoginPopupComponent {
  @Input() url!: string;
  @Input() users!: Array<User>;
  @Input() avatars!: Array<Avatar>;
  @Input() redirectLogin!: string;
  isSignIn = true;
  formLogin = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  registerForm = this.fb.group(
    {
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: [null],
      firstname: [''],
      lastname: [''],
      email: ['', [Validators.required, Validators.email]],
    },{
      validators: this.passwordMatchValidator
    }
  )

  constructor(
    public dialog: MatDialog,
    public router: Router,
    private fb: FormBuilder,
    public apiService: ApiService
  ) {
  }

  private passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      control.get('confirmPassword')?.setErrors(null);
    }
  }


  changePos() {
    this.isSignIn = !this.isSignIn;
  }

  getUserByName(name: string | null): void {
    if (name) {
      this.apiService.setNewDataUser(name);
    }
  }

  loginAction(userData: any, showMsg: boolean) {
    this.apiService.login(userData).subscribe(
      (res) => {
        localStorage.setItem('authToken', res?.accessToken);
        if (showMsg) {
          this.dialog.open(AlertDialogComponent, {
            data: {
              content: 'Login thành công'
            }
          });
        }
        setTimeout(() => {
          this.getUserByName(userData.username);
        }, 1000);
        setTimeout(() => {
          this.router.navigate([this.redirectLogin]);
        }, 2000);
      },
      (err) => {
        this.dialog.open(AlertDialogComponent, {
          data: {
            content: "Sai mật khẩu hoặc tài khoản"
          }
        });
      }
    );
  }

  login() {
    this.formLogin.markAllAsTouched();
    if (this.formLogin.invalid) {
      return;
    }
    const userData = this.formLogin.getRawValue();
    this.loginAction(userData, true);
  }

  register() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      return;
    }
    this.registerForm.removeControl("confirmPassword");
    const userData = this.registerForm.getRawValue();
    this.apiService.createUser(userData).subscribe(
      (res) => {
        setTimeout(() => {
          this.loginAction(userData, false);
        }, 1000);
        this.dialog.open(AlertDialogComponent, {
          data: {
            content: 'Tạo tài khoản thành công'
          }
        });
      },
      (err) => {
        this.dialog.open(AlertDialogComponent, {
          data: {
            content: err?.error
          }
        })
      }
    );
  }
}
