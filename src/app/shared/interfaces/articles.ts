export interface Article {
  link: string;
  title: string;
  text: string;
  isRead: boolean;
}

export type SubscribesState = {
  node: boolean;
  typescript: boolean;
  serverless: boolean;
  offbynone: boolean;
}

export type Site = keyof SubscribesState;

export type IssueLinks = { [key in Site]?: string };

export interface SiteArticles {
  site: Site;
  articles: Article[]
}

export interface ArticlesStateSchema {
  sitesArticles: SiteArticles[];
  subscribesState: SubscribesState;
}

