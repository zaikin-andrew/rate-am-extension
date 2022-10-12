import { Injectable } from '@angular/core';
import { Article, IssueLinks, Site } from '../../../interfaces/articles';
import { ParamsToLocalDateString } from '../../date.service';
import { SiteService } from './site.service';

@Injectable({
  providedIn: 'root',
})
export class TypescriptService extends SiteService {

  protected siteUrl = 'https://us14.campaign-archive.com';
  protected site: Site = 'typescript';
  protected xPathGetArticles = `.//div[@style = 'font-family:-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif;font-size:15px;font-weight:400;line-height:21px;text-align:left;color:#222222;' and not(div[@class = "footer"])]`;

  protected params: ParamsToLocalDateString = {
    locales: 'en-GB',
    options: {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    },
  };

  public async getParsedArticles(issueLinks: IssueLinks, oldArticles: Article[]): Promise<Article[]> {
    const issueUrl = await this.getIssueRoute(
      `${this.siteUrl}/home/?u=809daf9442ece0a92a3d65f99&id=5693c0ed42`,
      `.//div[@class ="display_archive"]/li`);
    if (!issueUrl) {
      return oldArticles;
    }
    const articleNodes = await this.getArticleNodes(issueUrl, this.xPathGetArticles);
    const parsedArticles: Article[] = [];

    for (const article of articleNodes) {
      const link = this.getLinkToArticle(article, `.//@href`);
      const title = this.getTitle(article, `.//h3`);
      const text = this.getText(article);
      parsedArticles.push({ link, title, text, isRead: false });
    }

    if (issueLinks[this.site] === issueUrl) {
      return this.getUpdatedArticles(oldArticles, parsedArticles);
    }
    issueLinks[this.site] = issueUrl;
    return parsedArticles;
  }

  private getText(article: Node): string {
    const xPathResult = article.ownerDocument!.evaluate(`.//p`, article, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    return xPathResult?.textContent ? xPathResult.textContent : '';

  }
}
