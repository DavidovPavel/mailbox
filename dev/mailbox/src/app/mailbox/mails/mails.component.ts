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
  letters$: Observable<Mail[]>;
  selected: Mail[] = [];
  boxid;
  constructor(
    private channel: ChannelService,
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.letters$ = this.route.paramMap
      .pipe(
        tap((params) => {
          // this.channel.setToolbar(Toolbar.LIST);
          this.boxid = params.get('boxid');
          this.channel.path$.next({ boxid: params.get('boxid'), mailid: null });
        })
      )
      .switchMap((params) => this.api.getMails(params.get('boxid')));

    this.channel.allSelect$.subscribe((flag) => {
      console.log(flag);
    });

    // this.channel.newmail$.subscribe(
    //   (m: Mail) => (this.letters$ = this.api.getMails(this.boxid))
    // );
  }

  ngOnDestroy(): void {
    this.channel.allSelect$.unsubscribe();
    // this.channel.newmail$.unsubscribe();
  }

  check(letter: Mail, event) {
    event.stopPropagation();
    if (event.target.checked) {
      if (!this.selected.find((m) => m._id === letter._id)) {
        this.selected.push(letter);
      }
    } else {
      this.selected = this.selected.filter((m) => m._id !== letter._id);
    }
    this.channel.selected$.next(this.selected);
  }
}
