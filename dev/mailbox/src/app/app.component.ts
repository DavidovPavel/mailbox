import { Component } from '@angular/core';
import { ChannelService } from './channel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private router: Router,
    private channel: ChannelService) {}

  search(value: string) {
      this.router.navigate([], {queryParams: { terms: value }});
  }
}
