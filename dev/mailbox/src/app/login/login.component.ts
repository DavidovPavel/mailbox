import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthoriseService } from '../authorise.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
<form [formGroup]="loginForm">
<p><label for="login">login:</label> <input type="text" formControlName="login"></p>
<p><label for="password">password:</label> <input type="text" formControlName="password"></p>
<p><button (click)="login()">Login</button></p>
</form>
  `
})
export class LoginComponent {
  constructor(private router: Router, private auth: AuthoriseService) {}

  loginForm: FormGroup = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  login() {
    if (this.loginForm.valid) {
      this.auth.Authorise(this.loginForm.value);
      this.router.navigate(['/mailbox']);
    }
  }
}
