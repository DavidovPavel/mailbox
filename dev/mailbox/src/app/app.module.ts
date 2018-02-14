import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MailboxComponent } from './mailbox/mailbox.component';
import { ApiService } from './api.service';
import { MailsComponent } from './mailbox/mails/mails.component';



@NgModule({
  declarations: [
    AppComponent,
    MailboxComponent,
    MailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
