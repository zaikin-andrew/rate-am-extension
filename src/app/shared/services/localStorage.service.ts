import { Injectable } from '@angular/core';
import { IssueLinks, SiteArticles, SubscribesState } from '../interfaces/articles';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  public getLinks(): IssueLinks {
    const links = JSON.parse(localStorage.getItem('links')!) as IssueLinks;
    return links ? links : {};
  }

  public saveLinks(links: IssueLinks) {
    localStorage.setItem('links', JSON.stringify(links));
  }

  public getArticles(): SiteArticles[] {
    const articles = JSON.parse(localStorage.getItem('sitesArticles')!) as SiteArticles[];
    return articles ? articles : [];
  }

  public saveArticles(sitesArticles: SiteArticles[]) {
    localStorage.setItem('sitesArticles', JSON.stringify(sitesArticles));
  }

  public saveSubscribes(subscribesState: SubscribesState) {
    localStorage.setItem('subscribesState', JSON.stringify(subscribesState));
  }


}
