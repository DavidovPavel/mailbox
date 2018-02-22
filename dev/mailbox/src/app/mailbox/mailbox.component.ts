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
    this.boxes$ = this.api.getBoxes().pipe(
      tap(bs => {
        this.router.navigate(['box', bs[0]._id]);
      })
    );

    this.channel.path$.subscribe(path => {
      this.path = path;

      this.selected = [];

      /**
       * Если убрать setTimeout - возникает ошибка
       * ExpressionChangedAfterItHasBeenCheckedError:
       * Expression has changed after it was checked.
       * Previous value: 'ngForOf: '. Current value: 'ngForOf: [object Object],[object Object],[object Object]'.
       *
       * При чем гугл говорит о том что эта ошибка возникает только в Dev режиме
       * ```
       * In short, after every round of change detection,
       * dev mode immediately performs a second round to verify that no bindings have changed since the end of the first,
       * as this would indicate that changes are being caused by change detection itself
       * ```
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


  switch(e) {
    this.channel.allSelect$.next(e.target.checked);
  }

  showForm() {
    if (this.path.boxid) {
      this.router.navigate([{ outlets: { add: ['add'] } }]);
    }
  }

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
      forkJoin(a).subscribe(_ => this.channel.oper$.next('updateList'));
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
