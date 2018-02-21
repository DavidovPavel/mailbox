import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user',
  template: `
  <li class="email-item row unread">
    <div class="col-sm-1" style="text-align:center">
    <img *ngIf="user.avatarUrl" src="{{user.avatarUrl}}" alt="" style="border-radius: 50%;width:32px;height:32px;">
    </div>
    <div class="people col-sm-3">{{ user.fullName }} </div>
    <div class="message col-sm-6">{{ user.email }}</div>
    <div class="col-sm-2">
      <button mat-icon-button color="primary" (click)="editUser()"><mat-icon>edit</mat-icon></button>
      <button mat-icon-button color="primary" (click)="clearUser()"><mat-icon>delete</mat-icon></button></div> 
</li>
  `,
})
export class UserComponent {
  @Input() user: User;
  @Output() clearUserEve: EventEmitter<User> = new EventEmitter<User>();
  @Output() editUserEve: EventEmitter<User> = new EventEmitter<User>();
  clearUser() {
    this.clearUserEve.emit(this.user);
  }
  editUser() {
    this.editUserEve.emit(this.user);
  }
}
