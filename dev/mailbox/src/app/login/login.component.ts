import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthoriseService } from '../authorise.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
  <style>
  .form {width: 400px;height:400px;margin: 100px auto 0;}
  </style>
  <div class="container">
<form [formGroup]="loginForm" class="form">
<p><input type="text" formControlName="login" placeholder="Логин"></p>
<p><input type="password" formControlName="password" placeholder="Пароль"></p>
<p><button (click)="login()">Ок</button></p>
</form>
</div>
  `
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private router: Router, private auth: AuthoriseService) {}

  ngOnInit(): void {
    document.cookie = '';
  }

  login() {
    if (this.loginForm.valid) {
      this.auth.Authorise(this.loginForm.value);
      this.router.navigate(['/box']);
    }
  }
}
