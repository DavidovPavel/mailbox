import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiService } from '../api.service';
import { Mailbox } from '../models/mailbox';

import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css']
})
export class MailboxComponent implements OnInit {
  boxes$: Observable<Mailbox[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

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
}
