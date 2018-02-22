import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ApiService } from '../../api.service';
import { ChannelService } from '../../channel.service';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Mail } from '../../models/mailbox';
import { User } from '../../models/user';

@Component({
  selector: 'app-mail-form',
  templateUrl: './mail-form.component.html',
  styleUrls: ['./mail-form.component.css'],
})
export class MailFormComponent implements OnInit {
  formGroup: FormGroup;
  boxid;

  users$: Observable<User[]>;
  searchTerm$ = new Subject<string>();

  constructor(
    private channel: ChannelService,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.route.root.children.forEach((r) => {
      r.children.forEach((cr) =>
        cr.paramMap.subscribe((cp) => (this.boxid = cp.get('boxid')))
      );
    });

    // this.channel.path$.subscribe(patch => (this.boxid = patch.boxid));

    this.formGroup = new FormGroup({
      to: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
    });

    this.users$ = this.searchTerm$.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.api.searchUsers(term))
    );
  }

  search(e) {
    if (e.code === 'ArrowDown') {
    } else {
      this.searchTerm$.next(e.target.value);
    }
  }

  selectUser(user: User) {
    this.formGroup.get('to').setValue(user.email);
    this.searchTerm$.next('');
  }

  hide() {
    this.router.navigate([{ outlets: { add: null } }]);
  }

  sendMail() {
    if (this.formGroup.valid && this.boxid) {
      const mail = new Mail(this.formGroup.value);
      mail.mailbox = this.boxid;
      this.api.newMail(mail).subscribe(m => {
        this.channel.oper$.next('updateList');
        this.hide();
      });
    }
  }
}
