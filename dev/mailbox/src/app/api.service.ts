import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mailbox, Mail } from './models/mailbox';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';


const API_URL = 'http://test-api.javascript.ru/v1/pdavydov/';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  getBoxes(): Observable<Mailbox[]> {
    return this.http.get<Mailbox[]>(`${API_URL}mailboxes/`);
  }

  saveBox(title: string) {
    return this.http.post<Mailbox>(`${API_URL}mailboxes/`, { title: title });
  }

  getMails(boxid: string): Observable<Mail[]> {
    return this.http
      .get<Mail[]>(`${API_URL}letters/`).map(data => data.filter(m => m.mailbox === boxid));
  }
}
