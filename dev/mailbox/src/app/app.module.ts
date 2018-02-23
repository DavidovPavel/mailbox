import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MailboxComponent } from './mailbox/mailbox.component';
import { MailsComponent } from './mailbox/mails/mails.component';
import { MailComponent } from './mailbox/mails/mail/mail.component';

import { ApiService } from './api.service';
import { AuthoriseService } from './authorise.service';
import { ChannelService } from './channel.service';
import { MailFormComponent } from './mailbox/mail-form/mail-form.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { MaterialModule } from './material.module';
import { DialogComponent } from './users/dialog/dialog.component';
import { MatNativeDateModule } from '@angular/material';
import { AuthGuard } from './auth.guard';

const routes = [
  {
    path: '',
    redirectTo: 'box',
    pathMatch: 'full'
  },
  {
    path: 'box',
    component: MailboxComponent,
    canActivate: [AuthGuard],
    children: [
      { path: ':boxid', component: MailsComponent },
      { path: ':boxid/:id', component: MailComponent }
    ]
  },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  {
    path: 'add',
    component: MailFormComponent,
    outlet: 'add'
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MailboxComponent,
    MailsComponent,
    MailComponent,
    LoginComponent,
    PageNotFoundComponent,
    MailFormComponent,
    UsersComponent,
    UserComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MaterialModule,
    MatNativeDateModule
  ],
  entryComponents: [
    DialogComponent
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ru' }, ApiService, AuthoriseService, ChannelService, AuthGuard],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
