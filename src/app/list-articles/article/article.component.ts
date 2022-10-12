import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Article, Site } from '../../shared/interfaces/articles';
import { BrowserService } from '../../shared/services/browser.service';
import { SetArticleIsRead } from '../../shared/store/articles-actions.state';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  @Input()
  article!: Article;
  @Input() articleIndex!: number;
  isRead: boolean = false;

  @Input()
  site!: Site;

  constructor(private store: Store, private browser: BrowserService) {
  }

  ngOnInit(): void {
    this.isRead = this.article.isRead;
  }

  changeIsRead(isRead: boolean) {
    this.store.dispatch(new SetArticleIsRead(this.articleIndex, isRead, this.site));
  }

  openPage() {
    this.browser.openPage(this.article.link);
  }

  getSiteIconPath(): string {
    let path = '../../assets/icons';
    switch (this.site) {
      case 'node':
        return `${path}/nodejs.svg`
      case 'serverless':
        return `${path}/sls.svg`;
      case 'typescript':
        return `${path}/ts.svg`;
      case 'offbynone':
        return `${path}/offbynone-icon.png`;
      default:
        return '';
    }
  }
}
