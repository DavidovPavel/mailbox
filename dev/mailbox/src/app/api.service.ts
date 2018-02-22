import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mailbox, Mail } from './models/mailbox';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { User } from './models/user';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators';

const API_URL = 'https://test-api.javascript.ru/v1/pdavydov/';

@Injectable()
export class ApiService {
  mails: Mail[] = [];

  constructor(private http: HttpClient) {}

  //#region users
  getUsers() {
    return this.http.get<User[]>(`${API_URL}users`);
  }

  addUser(user: User) {
    return this.http.post<User>(`${API_URL}users`, user);
  }

  clearUser(id: string) {
    return this.http.delete(`${API_URL}users/${id}`, { responseType: 'text' });
  }

  updateUser(id, user) {
    return this.http.patch(`${API_URL}users/${id}`, user);
  }

  searchUsers(term: string) {
    return !term.trim() ? of([]) : this.getUsers().map(users => users.filter(u => u.email.includes(term)));
  }

  //#endregion

  //#region mailbox
  getBoxes(): Observable<Mailbox[]> {
    return this.http.get<Mailbox[]>(`${API_URL}mailboxes/`);
  }

  saveBox(title: string) {
    return this.http.post<Mailbox>(`${API_URL}mailboxes/`, { title: title });
  }

  clearBox(id: string) {
    return this.http.delete(`${API_URL}mailboxes/${id}`, { responseType: 'text' });
  }
  //#endregion

  //#region mails
  getMails(boxid: string): Observable<Mail[]> {
    return this.http.get<Mail[]>(`${API_URL}letters/`).map(data => {
      this.mails = data
        .map(m => {
          m.received = new Date();
          return m;
        })
        .filter(m => m.mailbox === boxid);
      return this.mails;
    });
  }

  getMail(id: string, boxid?: string): Observable<Mail[]> {
    const m = this.mails.find(_m => _m._id === id);
    if (!m) {
      return this.getMails(boxid).map(data => [data.find(b => b._id === id)]);
    } else {
      return Observable.of([m]);
    }
  }

  newMail(mail: Mail): Observable<Mail> {
    const users$ = this.searchUsers(mail.to),
      add$ = this.addUser(new User({ fullName: mail.to, email: mail.to }));

    return this.http.post<Mail>(`${API_URL}letters/`, mail).pipe(
      tap(m => this.checkMail(m))
    );
  }

  checkMail(mail: Mail) {
    this.searchUsers(mail.to).subscribe(users => {
      if (!users.length) {
        this.addUser(new User({ fullName: mail.to, email: mail.to })).subscribe();
      }
    });
  }

  clearMail(id: string) {
    return this.http.delete(`${API_URL}letters/${id}`, { responseType: 'text' });
  }

  //#endregion
}
