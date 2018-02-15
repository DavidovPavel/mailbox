import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Observable } from 'rxjs/Observable';
import { Mail } from '../../../models/mailbox';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  mails$: Observable<Mail[]>;
  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    this.mails$ = this.route.paramMap.switchMap((param) =>
      this.api.getMail(param.get('id'), param.get('boxid'))
    );
  }
}
