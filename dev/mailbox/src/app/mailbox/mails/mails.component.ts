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
  boxid;
  constructor(
    private channel: ChannelService,
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        tap(params => {
          this.boxid = params.get('boxid');
          this.channel.path$.next({ boxid: params.get('boxid'), mailid: null });
        })
      )
      .switchMap(params => this.api.getMails(params.get('boxid')))
      .subscribe(m => {
        this.letters = m;
        this.cashe = m;
      });

    /**
     * Поиск писем
     */
    this.route.queryParamMap.subscribe(p => {
      const term = p.get('terms');
      this.letters = this.cashe.filter(
        m =>
          m.to.includes(term) ||
          m.subject.includes(term) ||
          m.body.includes(term)
      );
    });

    /**
     * Множественный выбор из тулбара
     */
    this.channel.allSelect$.subscribe(flag => {
      this.letters.forEach(m => (m.checked = flag));
      this.channel.selected$.next(this.letters.filter(m => m.checked));
    });

    /**
     * Обновляем список писем
     */
    this.channel.oper$.subscribe(name => {
      this.api.getMails(this.boxid).subscribe(a => (this.letters = a));
    });
  }

  ngOnDestroy(): void {
    // this.channel.allSelect$.unsubscribe();
    // this.channel.newmail$.unsubscribe();
  }

  /**
   * Выбор письма из списка по чекбоксу
   * @param letter
   * @param event
   */
  check(letter: Mail, event) {
    event.stopPropagation();
    letter.checked = event.target.checked;
    this.channel.selected$.next(this.letters.filter(m => m.checked));
  }
}
