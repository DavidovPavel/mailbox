import { Component, OnInit, OnDestroy, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiService } from '../api.service';
import { Mailbox, Mail } from '../models/mailbox';

import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { tap } from 'rxjs/operators';

import { ChannelService, Button, PathInfo, Toolbar } from '../channel.service';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css'],
})
export class MailboxComponent implements OnInit, AfterContentInit, OnDestroy {
  boxes$: Observable<Mailbox[]>;

  toolbar: Button[] = [];

  path: PathInfo;
  select = false;
  selected: Mail[] = [];

  showMenu = false;

  constructor(
    private cdRef: ChangeDetectorRef,
    private channel: ChannelService,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.boxes$ = this.api.getBoxes().pipe(tap(bs => this.router.navigate(['box', bs[0]._id])));

    /**
     * Изменение данных при изменении рутинга...
     * Подписка на события роута не привели к желаемым результатм: не удается получить boxid, id
     */
    this.channel.path$.subscribe(path => {
      this.path = path;

      this.selected = [];

      /**
       *
       */
      setTimeout(_ => (this.toolbar = this.channel.getToolbarButton(path.mailid ? Toolbar.DETAILS : Toolbar.LIST)));
    });

    this.channel.selected$.subscribe((s: Mail[]) => (this.selected = s));
  }

  /**
   * Попытка решить проблему выше
   */
  ngAfterContentInit(): void {
    // this.toolbar$ = this.channel.toolbar$;
    // this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    // this.channel.path$.unsubscribe();
    // this.channel.selected$.unsubscribe();
  }

  /**
   * Чекбокс "Выбрать все"
   * @param e
   */
  switch(e) {
    this.channel.allSelect$.next(e.target.checked);
  }

  /**
   * Написать письмо
   */
  showForm() {
    if (this.path.boxid) {
      this.router.navigate([{ outlets: { add: ['add'] } }]);
    }
  }

  /**
   * Handler button event from toolbar
   * @param name action name
   */
  onToolbar(name: string) {
    switch (name) {
      case 'backToList':
        this.router.navigate(['box', this.path.boxid]);
        break;
      case 'trash':
        if (confirm('Вы уверены?')) {
          this.api.clearMail(this.path.mailid).subscribe(_ => {
            this.router.navigate(['box', this.path.boxid]);
          });
        }
    }
  }

  allClear() {
    if (confirm('Все будет удалено!')) {
      const a = [];
      this.selected.forEach(m => a.push(this.api.clearMail(m._id)));
      forkJoin(a).subscribe(_ => {
        this.channel.oper$.next('updateList');
        this.selected = [];
      });
    }
  }

  //#region mailbox
  addBox(title: string) {
    if (title.trim()) {
      this.api.saveBox(title).subscribe(box => (this.boxes$ = this.api.getBoxes()));
    }
  }

  clearBox(box) {
    this.api.clearBox(box._id).subscribe();
  }

  //#endregion
}
