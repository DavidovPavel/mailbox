import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mailbox, Mail } from './models/mailbox';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

const API_URL = 'https://test-api.javascript.ru/v1/pdavydov/';

@Injectable()
export class ApiService {
  mails: Mail[] = [];

  constructor(private http: HttpClient) {}

  getBoxes(): Observable<Mailbox[]> {
    return this.http.get<Mailbox[]>(`${API_URL}mailboxes/`);
  }

  saveBox(title: string) {
    return this.http.post<Mailbox>(`${API_URL}mailboxes/`, { title: title });
  }

  getMails(boxid: string): Observable<Mail[]> {
    return this.http.get<Mail[]>(`${API_URL}letters/`).map((data) => {
      this.mails = data
        .map((m) => {
          m.received = new Date();
          return m;
        })
        .filter((m) => m.mailbox === boxid);
      return this.mails;
    });
  }

  getMail(id: string, boxid?: string): Observable<Mail[]> {
    const m = this.mails.find((_m) => _m._id === id);
    if (!m) {
      return this.getMails(boxid).map((data) => [
        data.find((b) => b._id === id)
      ]);
    } else {
      return Observable.of([m]);
    }
  }

  newMail(mail: Mail): Observable<Mail> {
    return this.http.post<Mail>(`${API_URL}letters/`, mail);
  }

  clearMail(id: string) {
    return this.http.delete(`${API_URL}letters/${id}`, { responseType: 'text' });
  }

  clearBox(id: string) {
    return this.http.delete(`${API_URL}mailboxes/${id}`, { responseType: 'text' });
  }
}
