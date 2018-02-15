import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Mail } from '../../models/mailbox';
import { ApiService } from '../../api.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-mails',
  templateUrl: './mails.component.html',
  styleUrls: ['./mails.component.css']
})
export class MailsComponent implements OnInit {
  letters$: Observable<Mail[]>;
  boxId: string;
  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.letters$ = this.route.paramMap.switchMap((params) => {
      this.boxId = params.get('boxid');
      console.log(params);
      return this.api.getMails(this.boxId);
    });

    this.route.params.subscribe(param => console.log(param));
  }
}
