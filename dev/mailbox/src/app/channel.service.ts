import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

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
  constructor(opt: { name: string; title?: string, icon?: string, tmpl?: ButtonTemplate }) {
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
  [new Button({ name: 'back', icon: 'arrow-left', title: 'Вернутся' }), new Button({ name: 'trash', icon: 'trash', title: 'Удалить' })]
];

@Injectable()
export class ChannelService {
  public toolbar$: Subject<Button[]> = new Subject<Button[]>();

  constructor() {}

  setToolbar(page: Toolbar) {
    this.toolbar$.next(TOOLBAR_SET[page]);
  }
}
