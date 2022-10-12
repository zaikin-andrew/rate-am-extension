import { Injectable } from '@angular/core';
import { Article, IssueLinks, Site } from '../../../interfaces/articles';
import { ParamsToLocalDateString } from '../../date.service';
import { SiteService } from './site.service';

@Injectable({
  providedIn: 'root',
})
export class OffByNoneService extends SiteService {

  protected siteURL = 'https://offbynone.io';
  protected site: Site = 'offbynone';
  protected xPathGetArticles = `.//div[@class = "col-10 col-sm-11"]/p | .//div[@class = 'col-lg-8 py-5 px-md-5 px-sm-3']/p[strong[a[not(contains(@href,'/issues/')) and not(contains(@href,'#signup'))]]]`;

  protected params: ParamsToLocalDateString = {
    locales: 'en-US',
    options: {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    },
  };

  public async getParsedArticles( issueLinks: IssueLinks, oldArticles: Article[]): Promise<Article[]> {
    const issueRoute = await this.getIssueRoute(this.siteURL, `.//div[@class ="card mb-0"]`);
    if (!issueRoute) {
      return oldArticles;
    }
    const issueUrl = `${this.siteURL}${issueRoute}/top`;
    const articleNodes = await this.getArticleNodes(issueUrl, this.xPathGetArticles);
    const parsedArticles: Article[] = [];

    for (const article of articleNodes) {
      const link = this.getLinkToArticle(article, `.//@href`);
      const title = this.getTitle(article, `.//strong`);
      const text = this.getText(article);
      parsedArticles.push({ link, title, text, isRead: false });
    }
    if (issueLinks[this.site] === issueRoute) {
      return this.getUpdatedArticles(oldArticles, parsedArticles);
    }
    issueLinks[this.site] = issueRoute;
    return parsedArticles;
  }

  private getText(article: Node): string {
    const nodes = article.childNodes;
    const textNode = nodes[3] ? nodes[3] : nodes[2];
    return textNode.textContent ? textNode.textContent : '';
  }


}
