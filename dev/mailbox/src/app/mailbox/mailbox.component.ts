import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Mailbox, Mail } from '../models/mailbox';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css']
})
export class MailboxComponent implements OnInit {
  boxes$: Observable<Mailbox[]>;
  letters$: Observable<Mail[]>;
  currentBoxId;
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.boxes$ = this.api.getBoxes();
  }

  addBox(title: string) {
    if (title.trim()) {
      this.api
        .saveBox(title)
        .subscribe((box) => (this.boxes$ = this.api.getBoxes()));
    }
  }

  getMails(box: Mailbox) {
    this.currentBoxId = box._id;
    this.letters$ = this.api.getMails(box._id);
  }
}
