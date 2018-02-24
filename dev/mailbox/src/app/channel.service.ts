import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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

/** 
 * Кнопка для тулбара
*/
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

/**
 * Сервис для взаимодействия между компонентами
 */
export class ChannelService {
  /**
   * Состояние приложения, содержит текущее значение mailbox_id, letter_id
   * @description PathInfo {boxid: string; mailid: string;}
   */
  public path$: Subject<PathInfo> = new Subject();

  // public toolbar$: Subject<Button[]> = new Subject<Button[]>();

  /**
   * Поток изменения массива выбраных писем
   */
  public selected$: BehaviorSubject<Mail[]> = new BehaviorSubject<Mail[]>([]);

  /**
   * Изменение сосотяния чекбокса "Выбрать все"
   */
  public allSelect$: Subject<boolean> = new Subject();

  /**
   * Пришло новое письмо
   */
  public newmail$: Subject<Mail> = new Subject();

  // public search$: Subject<string> = new Subject();

  /**
   * Update list
   */
  public oper$: Subject<string> = new Subject();

  /**
   * Набор кнопок для тулбара для разных компонентов
   * @param page
   */
  getToolbarButton(page: Toolbar) {
    return TOOLBAR_SET[page];
  }
}
