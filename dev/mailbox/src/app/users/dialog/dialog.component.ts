import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.css'],
})
export class DialogComponent {
  info = '';

  userFormGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: User) {
    this.userFormGroup  = new FormGroup({
      fullName: new FormControl(data.fullName, Validators.required),
      email: new FormControl(data.email, [Validators.required, Validators.email]),
      avatarUrl: new FormControl(data.avatarUrl),
      birthdate: new FormControl(data.birthdate),
      gender: new FormControl(data.gender),
      address: new FormControl(data.address),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
