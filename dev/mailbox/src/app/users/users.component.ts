import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  constructor(private dialog: MatDialog, private api: ApiService) {}

  ngOnInit() {
    this.users$ = this.api.getUsers();
  }

  clearUser(user: User) {
    if (confirm('Вы уверены? Пользователь будет удален.')) {
      this.api.clearUser(user._id).subscribe(_ => (this.users$ = this.api.getUsers()));
    }
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: user,
    });

    dialogRef.beforeClose().subscribe(data => {
      if (data && data.valid) {
        this.api.updateUser(user._id, data.value).subscribe(_ => (this.users$ = this.api.getUsers()));
      }
    });
  }

  showAdd() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: new User({ fullName: '', email: '' }),
    });

    dialogRef.beforeClose().subscribe(data => {
      if (data && data.valid) {
        this.api.addUser(new User(data.value)).subscribe(u => (this.users$ = this.api.getUsers()));
      }
    });
  }
}
