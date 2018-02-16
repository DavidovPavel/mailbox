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

const routes = [
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  },
  {
    path: 'app',
    component: MailboxComponent,
    // canActivate: [AuthGuard]
    children: [
      { path: ':boxid', component: MailsComponent },
      { path: ':boxid/:id', component: MailComponent }
    ]
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
    PageNotFoundComponent
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
