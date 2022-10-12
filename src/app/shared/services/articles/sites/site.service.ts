import { Injectable } from '@angular/core';
import axios from 'axios';
import { Article } from '../../../interfaces/articles';
import { DateService, ParamsToLocalDateString } from '../../date.service';

@Injectable({
  providedIn: 'root',
})

export class SiteService {

  protected params: ParamsToLocalDateString = {
    locales: 'en-US',
    options: {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    },
  };

  constructor() {
  }

  protected async getArticleNodes(url: string, xPath: string): Promise<Node[]> {
    const { data } = await axios.get<string>(url);
    const pageHTML = new DOMParser().parseFromString(data, 'text/html');
    const articles = pageHTML.evaluate(xPath, pageHTML.body, null, XPathResult.ANY_TYPE, null);
    let article = articles.iterateNext();
    let nodeArticles: Node[] = [];
    while (article) {
      nodeArticles.push(article);
      article = articles.iterateNext();
    }
    return nodeArticles;
  }

  protected getTitle(article: Node, xPath: string): string {
    return article.ownerDocument!.evaluate(xPath, article, null, XPathResult.STRING_TYPE, null).stringValue;
  }

  protected getLinkToArticle(article: Node, xPath: string): string {
    return article.ownerDocument!.evaluate(xPath, article, null, XPathResult.STRING_TYPE, null).stringValue;
  }

  protected getUpdatedArticles(articlesFromLocalStorage: Article[], newArticles: Article[]): Article[] {
    let updatedArticles = articlesFromLocalStorage;

    for (const article of newArticles) {
      const articleIsExist = articlesFromLocalStorage.some(value => {
        return value.link === article.link;
      });
      if (!articleIsExist) {
        updatedArticles.push(article);
      }
    }
    return updatedArticles;
  }

  protected async getIssueRoute(url: string, firstPathOfXPath: string): Promise<string> {
    const { data: page } = await axios.get<string>(url);
    const pageHTML = new DOMParser().parseFromString(page, 'text/html');
    const xPathGetIssueLink = `${firstPathOfXPath}//@href`;
    return pageHTML.evaluate(xPathGetIssueLink, pageHTML.body, null, XPathResult.STRING_TYPE, null).stringValue;
  }


  //if need get by interval
  protected getXPathForCheckDates(date: Date): string {

    const dateService = new DateService();

    const lastSevenDays = dateService.getLastSevenDays(date, this.params);
    let xPathCheckDates = '';

    lastSevenDays.forEach((day, index) => {
      if (index) {
        xPathCheckDates += ` or `;
      }
      xPathCheckDates += `contains(.,'${day}')`;
    });
    return xPathCheckDates;
  }

}

