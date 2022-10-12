import {Injectable} from '@angular/core';
import {Article, ArticlesStateSchema, IssueLinks, Site, SiteArticles} from '../../interfaces/articles';
import {LocalStorageService} from '../localStorage.service';
import {NodeService} from './sites/node.service';
import {OffByNoneService} from './sites/off-by-none.service';
import {ServerlessService} from './sites/serverless.service';
import {TypescriptService} from './sites/typescript.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {

  node = new NodeService();
  offbynone = new OffByNoneService();
  serverless = new ServerlessService();
  typescript = new TypescriptService();

  localStorage = new LocalStorageService();

  constructor() {
  }

  public async getArticles(state: ArticlesStateSchema): Promise<SiteArticles[]> {
    const { subscribesState, sitesArticles } = state;
    console.log('articles from store: ', sitesArticles);
    const links = this.localStorage.getLinks();
    const updatedArticles: SiteArticles[] = [];
    for (const source of Object.keys(subscribesState)) {
      const site = source as Site;
      if (!subscribesState[site]) {
        continue;
      }
      const oldArticles = this.getArticlesFromSitesArticles(sitesArticles, site);
      const newArticles = await this.getParsedArticlesBySource(site, oldArticles, links);
      updatedArticles.push({
        site: site,
        articles: this.filterDuplicates(newArticles, updatedArticles),
      });
    }
    this.localStorage.saveLinks(links);
    return updatedArticles;
  }

  private async getParsedArticlesBySource(source: Site, oldArticles: Article[], links: IssueLinks): Promise<Article[]> {
    switch (source) {
      case 'node':
        return await this.node.getParsedArticles(links, oldArticles);
      case 'typescript':
        return await this.typescript.getParsedArticles(links, oldArticles);
      case 'offbynone':
        return await this.offbynone.getParsedArticles(links, oldArticles);
      case 'serverless':
        return await this.serverless.getParsedArticles(links, oldArticles);
      default:
        return [];
    }
  }

  private filterDuplicates(newArticles: Article[], sitesWithArticles: SiteArticles[]): Article[] {
    return newArticles.filter(value => {
      return !sitesWithArticles.some((element) => {
        return element.articles.some(article =>
          article.link === value.link,
        );
      });
    });
  }

  private getArticlesFromSitesArticles(sitesArticles: SiteArticles[], site: Site): Article[] {
    const siteArticles = sitesArticles.find(siteArticles => siteArticles.site === site);
    return siteArticles ? siteArticles.articles : [];
  }

}
