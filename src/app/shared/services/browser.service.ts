import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { MessageFromServiceWorker } from '../interfaces/messageFromServiceWorker';
import { GetArticles } from '../store/articles-actions.state';

declare const window: any;

const browser = (function () {
  return window.msBrowser ||
    window.browser ||
    window.chrome;
})();

@Injectable({
  providedIn: 'root',
})
export class BrowserService {

  setListener(store: Store) {
    browser.runtime.onMessage.addListener((message: MessageFromServiceWorker) => {
      console.log(`Message from the background script:  ${message.status}`);
      if (message.status == 'GET_ARTICLES') {
        store.dispatch(new GetArticles());
      }
    });
  }

  openPage(link: string) {
    browser.tabs.create({ url: link });
  }

  openMailClient(message: string) {
    browser.tabs.update({
      url: `mailto:hello@flo.team?subject=Request For FLO Extension&body=${message}`
    });
  }


}
