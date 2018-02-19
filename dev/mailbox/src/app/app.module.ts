import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
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

const routes = [
  {
    path: '',
    redirectTo: 'box',
    pathMatch: 'full'
  },
  {
    path: 'box',
    component: MailboxComponent,
    // canActivate: [AuthGuard]
    children: [
      { path: ':boxid', component: MailsComponent },
      { path: ':boxid/:id', component: MailComponent }
    ]
  },
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
    MailFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ApiService, AuthoriseService, ChannelService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
