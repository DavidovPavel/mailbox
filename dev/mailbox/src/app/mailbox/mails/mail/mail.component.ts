import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Observable } from 'rxjs/Observable';
import { Mail } from '../../../models/mailbox';
import { ChannelService, Toolbar } from '../../../channel.service';

import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  mails$: Observable<Mail[]>;
  constructor(
    private channel: ChannelService,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.mails$ = this.route.paramMap
      .pipe(tap((p) => this.channel.setToolbar(Toolbar.DETAILS)))
      .switchMap((param) =>
        this.api.getMail(param.get('id'), param.get('boxid'))
      );
  }
}
