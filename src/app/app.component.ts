import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import {BrowserService} from "./shared/services/browser.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  header = '';
  link = '';

  constructor(private router: Router, private browser: BrowserService) {
  }

  public ngOnInit() {
    this.router.events.subscribe((events) => {
      if (events instanceof NavigationStart) {
        if (events.url === '/' || events.url === '/articles') {
          this.header = 'Articles';
          this.link = '/settings';
        } else {
          this.header = 'Settings';
          this.link = '/';
        }
      }
    });
  }

  public openLink(link: string) {
    this.browser.openPage(link);
  }

}
