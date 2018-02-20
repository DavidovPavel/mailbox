import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import 'rxjs/add/operator/delay';
import { Mail } from './models/mailbox';

export interface PathInfo {
  boxid: string;
  mailid: string;
}

export enum Toolbar {
  LIST,
  DETAILS
}

enum ButtonTemplate {
  default,
  checkbox,
  label
}

export class Button {
  name: string;
  title?: string;
  icon?: string;
  templ: ButtonTemplate;
  constructor(opt: {
    name: string;
    title?: string;
    icon?: string;
    tmpl?: ButtonTemplate;
  }) {
    this.name = opt.name;
    this.templ = opt.tmpl || 0;
    this.title = opt.title;
    this.icon = opt.icon;
  }
}

const TOOLBAR_SET = [
  [
    new Button({ name: 'select', tmpl: ButtonTemplate.checkbox }),
    new Button({ name: 'repeat', icon: 'repeat' }),
    new Button({ name: 'more', tmpl: ButtonTemplate.label })
  ],
  [
    new Button({ name: 'backToList', icon: 'arrow-left', title: 'Вернутся' }),
    new Button({ name: 'trash', icon: 'trash', title: 'Удалить' })
  ]
];

@Injectable()
export class ChannelService {

  public path$: Subject<PathInfo> = new Subject();
  public toolbar$: Subject<Button[]> = new Subject<Button[]>();
  public selected$: BehaviorSubject<Mail[]> = new BehaviorSubject<Mail[]>([]);
  public allSelect$: Subject<boolean> = new Subject();

  public newmail$: Subject<Mail> = new Subject();

  public search$: Subject<string> = new Subject();

  public oper$: Subject<string> = new Subject();

  constructor() {}

  // setToolbar(page: Toolbar) {
  //   // setTimeout(_ => {
  //   this.toolbar$.next(TOOLBAR_SET[page]);
  //   // }, 100);
  // }

  getToolbarButton(page: Toolbar) {
    return TOOLBAR_SET[page];
  }
}
