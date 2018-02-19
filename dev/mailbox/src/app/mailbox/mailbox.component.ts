import {
  Component,
  OnInit,
  AfterContentInit,
  ChangeDetectorRef
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiService } from '../api.service';
import { Mailbox } from '../models/mailbox';

import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { ChannelService, Button } from '../channel.service';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css']
})
export class MailboxComponent implements OnInit, AfterContentInit {
  boxes$: Observable<Mailbox[]>;
  toolbar$: Observable<Button[]>;

  boxid;
  mailid;

  constructor(
    private cdRef: ChangeDetectorRef,
    private channel: ChannelService,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.boxes$ = this.api.getBoxes();

    this.route.url.subscribe((a) => {
      console.log(a);
    });

    this.route.children.forEach((r) =>
      r.paramMap.subscribe((paramMap) => {
        this.boxid = paramMap.get('boxid');
        this.mailid = paramMap.get('id');
      })
    );
  }

  ngAfterContentInit(): void {
    this.toolbar$ = this.channel.toolbar$;
    this.cdRef.detectChanges();
  }

  addBox(title: string) {
    if (title.trim()) {
      this.api
        .saveBox(title)
        .subscribe((box) => (this.boxes$ = this.api.getBoxes()));
    }
  }

  showForm() {
    this.router.navigate([{ outlets: { add: ['add'] } }]);
  }

  onToolbar(name: string) {
    switch (name) {
      case 'backToList':
        this.router.navigate(['box', this.boxid]);
        break;
      case 'trash':
        if (confirm('Вы уверены?')) {
          this.api.clearMail(this.mailid).subscribe((_) => {
            this.router.navigate(['box', this.boxid]);
          });
        }
    }
  }
}
