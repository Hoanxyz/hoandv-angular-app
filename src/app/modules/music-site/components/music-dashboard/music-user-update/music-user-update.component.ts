import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../../../shared/services/services.service";
import {AlertDialogComponent} from "../../../../../shared/components/alert-dialog/alert-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-music-user-update',
  templateUrl: './music-user-update.component.html',
  styleUrls: ['./music-user-update.component.scss']
})
export class MusicUserUpdateComponent implements OnInit {
  @Input() user!: any;
  updateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.updateForm = this.fb.group(
      {
        username: [this.user.username],
        email: [this.user.email, [Validators.required]],
        firstname: [this.user?.firstname],
        lastname: [this.user?.lastname],
        oldPassword: [null, [Validators.required]],
        password: [null],
        confirmPassword: [null],
      },{
        validators: this.passwordMatchValidator
      }
    )
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

  update(): void {
    this.updateForm.markAllAsTouched();
    if (this.updateForm.invalid) {
      return;
    }
    const userData = {
      email: this.updateForm.get('email')?.value ? this.updateForm.get('email')?.value.trim() : "",
      firstname: this.updateForm.get('firstname')?.value ? this.updateForm.get('firstname')?.value.trim() : "",
      lastname: this.updateForm.get('lastname')?.value ? this.updateForm.get('lastname')?.value.trim() : "",
      password: this.updateForm.get('password')?.value ? this.updateForm.get('password')?.value.trim() : ""
    };
    this.apiService.updateUser(userData, this.user.id, this.updateForm.get('oldPassword')?.value).subscribe(
      (res) => {
        this.apiService.setNewDataUser(this.user.username);
        this.dialog.open(AlertDialogComponent, {
          data: {
            content: 'Cập nhật thông tin thành công'
          }
        });
      }
      ,
      (err) => {
        this.dialog.open(AlertDialogComponent, {
          data: {
            content: err
          }
        });
      }
    )
  }
}
