import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Mail } from '../../models/mailbox';
import { ApiService } from '../../api.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { ChannelService, Toolbar } from '../../channel.service';

@Component({
  selector: 'app-mails',
  templateUrl: './mails.component.html',
  styleUrls: ['./mails.component.css']
})
export class MailsComponent implements OnInit {
  letters$: Observable<Mail[]>;
  boxId: string;
  constructor(
    private channel: ChannelService,
    private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {

    this.channel.setToolbar(Toolbar.LIST);

    this.letters$ = this.route.paramMap.switchMap((params) => {
      this.boxId = params.get('boxid');
      return this.api.getMails(this.boxId);
    });

    // this.route.params.subscribe(param => console.log(param));
  }
}
