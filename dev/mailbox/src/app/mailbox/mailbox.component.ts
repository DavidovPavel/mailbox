import {
  Component,
  OnInit,
  OnDestroy,
  AfterContentInit,
  ChangeDetectorRef
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiService } from '../api.service';
import { Mailbox, Mail } from '../models/mailbox';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { tap, merge } from 'rxjs/operators';
import { ChannelService, Button, PathInfo, Toolbar } from '../channel.service';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css']
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
    this.boxes$ = this.api.getBoxes();
    this.channel.path$.subscribe((path) => {
      this.path = path;
      this.selected = [];
      setTimeout((_) => {
        this.toolbar = this.channel.getToolbarButton(
          path.mailid ? Toolbar.DETAILS : Toolbar.LIST
        );
      }, 100);
    });

    this.channel.selected$.subscribe((s: Mail[]) => (this.selected = s));
  }

  ngOnDestroy(): void {
    // this.channel.path$.unsubscribe();
    // this.channel.selected$.unsubscribe();
  }

  ngAfterContentInit(): void {
    // this.toolbar$ = this.channel.toolbar$;
    // this.cdRef.detectChanges();
  }

  switch(e) {
    this.channel.allSelect$.next(e.target.checked);
  }

  showForm() {
    this.router.navigate([{ outlets: { add: ['add'] } }]);
  }

  onToolbar(name: string) {
    switch (name) {
      case 'backToList':
        this.router.navigate(['box', this.path.boxid]);
        break;
      case 'trash':
        if (confirm('Вы уверены?')) {
          this.api.clearMail(this.path.mailid).subscribe((_) => {
            this.router.navigate(['box', this.path.boxid]);
          });
        }
    }
  }

  allClear() {
    if (confirm('Все будет удалено!')) {
      const a = [];
      this.selected.forEach((m) => a.push(this.api.clearMail(m._id)));
      forkJoin(a).subscribe((_) => this.channel.oper$.next('updateList'));
    }
  }

  //#region mailbox
  addBox(title: string) {
    if (title.trim()) {
      this.api
        .saveBox(title)
        .subscribe((box) => (this.boxes$ = this.api.getBoxes()));
    }
  }

  clearBox(box) {
    this.api.clearBox(box._id).subscribe();
  }

  //#endregion
}
