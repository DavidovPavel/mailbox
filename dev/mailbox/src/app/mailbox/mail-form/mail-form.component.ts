import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Mail } from '../../models/mailbox';
import { ChannelService } from '../../channel.service';

@Component({
  selector: 'app-mail-form',
  templateUrl: './mail-form.component.html',
  styleUrls: ['./mail-form.component.css']
})
export class MailFormComponent implements OnInit {
  formGroup: FormGroup;
  boxid;

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

    this.formGroup = new FormGroup({
      to: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required)
    });
  }

  hide() {
    this.router.navigate([{ outlets: { add: null } }]);
  }

  sendMail() {
    if (this.formGroup.valid) {
      const mail = new Mail(this.formGroup.value);
      mail.mailbox = this.boxid;
      this.api.newMail(mail).subscribe((m) => {
        this.channel.oper$.next('updateList');
        this.hide();
      });
    }
  }
}
