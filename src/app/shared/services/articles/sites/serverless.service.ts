import { Injectable } from '@angular/core';
import { Article, IssueLinks, Site } from '../../../interfaces/articles';
import { ParamsToLocalDateString } from '../../date.service';
import { SiteService } from './site.service';

@Injectable({
  providedIn: 'root',
})
export class ServerlessService extends SiteService {

  protected xPathGetArticles = `.//*[@id = 'content']/table[@class='el-item item  ']/tbody/tr/td[p[@class = 'name' and not(*)]]//p[@class='desc'] | .//*[@id = 'content']/table[@class='miniitem item  ']/tbody/tr/td//p[@class='desc']`;
  protected site: Site = 'serverless';
  protected siteUrl = 'https://serverless.email';
  protected params: ParamsToLocalDateString = {
    locales: 'en-US',
    options: {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    },
  };

  public async getParsedArticles(issueLinks: IssueLinks, oldArticles: Article[]): Promise<Article[]> {
    const issueRoute = await this.getIssueRoute(`${this.siteUrl}/issues`, './/div[@class = "issues"]/div');
    if (!issueRoute) {
      return oldArticles;
    }
    const issueUrl = `${this.siteUrl}/${issueRoute}`;
    const articleNodes = await this.getArticleNodes(issueUrl, this.xPathGetArticles);
    const parsedArticles: Article[] = [];

    for (const article of articleNodes) {
      const link = this.getLinkToArticle(article, `.//@href`);
      const title = this.getTitle(article, `.//span`);
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
    const xPathGetArticleText = `.//descendant::text()[not(ancestor::span)]`;
    const xPathResult = article.ownerDocument!.evaluate(xPathGetArticleText, article, null, XPathResult.ANY_TYPE, null);
    let result = xPathResult.iterateNext();
    let text = '';

    while (result) {
      text += result.textContent;
      result = xPathResult.iterateNext();
    }

    return text;
  }

}
