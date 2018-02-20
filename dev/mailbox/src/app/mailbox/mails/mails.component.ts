import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Mail } from '../../models/mailbox';
import { ApiService } from '../../api.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { ChannelService, Toolbar } from '../../channel.service';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-mails',
  templateUrl: './mails.component.html',
  styleUrls: ['./mails.component.css']
})
export class MailsComponent implements OnInit, OnDestroy {
  letters: Mail[] = [];
  cashe: Mail[] = [];
  result: Mail[] = [];
  selected: Mail[] = [];
  boxid;
  constructor(
    private channel: ChannelService,
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        tap((params) => {
          this.boxid = params.get('boxid');
          this.channel.path$.next({ boxid: params.get('boxid'), mailid: null });
        })
      )
      .switchMap((params) => this.api.getMails(params.get('boxid')))
      .subscribe((m) => {
        this.letters = m;
        this.cashe = m;
      });

    this.route.queryParamMap.subscribe((p) => {
      const term = p.get('terms');
      this.letters = this.cashe.filter(
        (m) =>
          m.to.includes(term) ||
          m.subject.includes(term) ||
          m.body.includes(term)
      );
    });

    this.channel.allSelect$.subscribe((flag) => {
      if (flag) {
        this.letters.forEach((m) => (m.checked = true));
      } else {
        this.letters.forEach((m) => (m.checked = false));
      }
      this.channel.selected$.next(this.letters.filter((m) => m.checked));
    });

    this.channel.oper$.subscribe((name) => {
      this.api.getMails(this.boxid).subscribe((a) => (this.letters = a));
    });

    // this.channel.newmail$.subscribe(
    //   (m: Mail) => (this.letters$ = this.api.getMails(this.boxid))
    // );
  }

  ngOnDestroy(): void {
    // this.channel.allSelect$.unsubscribe();
    // this.channel.newmail$.unsubscribe();
  }

  check(letter: Mail, event) {
    event.stopPropagation();
    if (event.target.checked) {
      if (!this.selected.find((m) => m._id === letter._id)) {
        letter.checked = true;
      }
    } else {
      letter.checked = false;
    }
    this.channel.selected$.next(this.letters.filter((m) => m.checked));
  }
}
