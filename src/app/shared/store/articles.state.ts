import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Article, ArticlesStateSchema, SiteArticles, SubscribesState } from '../interfaces/articles';
import { ArticlesService } from '../services/articles/articles.service';
import { LocalStorageService } from '../services/localStorage.service';
import {
  SetArticleIsRead,
  GetArticles, SetSubscribeState, SetArticles,
} from './articles-actions.state';

const subscribesStateFromLS: SubscribesState = localStorage.getItem('subscribesState') ? JSON.parse(localStorage.getItem('subscribesState') || '') : '';

const defaultState: ArticlesStateSchema = {
  sitesArticles: [],
  subscribesState: subscribesStateFromLS || {
    node: true,
    typescript: true,
    serverless: true,
    offbynone: true,
  },
};

@State<ArticlesStateSchema>({
  name: 'ArticlesState',
  defaults: defaultState,
})
@Injectable()
export class ArticlesState {

  constructor(private store: Store, private articlesService: ArticlesService, private localStorage: LocalStorageService) {
  }

  @Selector()
  static state(data: ArticlesStateSchema): ArticlesStateSchema {
    return data;
  }

  @Selector()
  static articles({ sitesArticles }: ArticlesStateSchema): SiteArticles[] {
    return sitesArticles;
  }

  @Selector()
  static subscribesState({ subscribesState }: ArticlesStateSchema): SubscribesState {
    return subscribesState;
  }

  @Action(GetArticles)
  private async getArticles({ setState, getState }: StateContext<ArticlesStateSchema>): Promise<void> {
    const articles: SiteArticles[] = await this.articlesService.getArticles(getState());
    setState({ ...getState(), sitesArticles: articles });

    this.localStorage.saveArticles(getState().sitesArticles);
  }

  @Action(SetArticles)
  private setArticles({ setState, getState }: StateContext<ArticlesStateSchema>, { articles }: SetArticles): void {
    setState({ ...getState(), sitesArticles: articles });
  }

  @Action(SetArticleIsRead)
  private setArticleIsRead({ setState, getState }: StateContext<ArticlesStateSchema>, { index, isRead, site }: SetArticleIsRead) {
    const sitesArticles = [...getState().sitesArticles];

    const clonedSitesArticles: SiteArticles[] = [];
    sitesArticles.forEach(val => clonedSitesArticles.push(Object.assign({}, val)));

    let indexOfSite: number;
    const siteArticles = clonedSitesArticles.find((value, index) => {
        indexOfSite = index;
        return value.site == site;
      },
    );

    const clonedArticles = Object.assign([] as Article[], siteArticles!.articles as Article[]);

    const changedArticle = Object.assign({}, clonedArticles![index]);

    changedArticle.isRead = isRead;
    clonedArticles[index] = changedArticle;

    clonedSitesArticles[indexOfSite!].articles = clonedArticles!;

    setState({ ...getState(), sitesArticles: clonedSitesArticles });
    this.localStorage.saveArticles(getState().sitesArticles);

  }

  @Action(SetSubscribeState)
  private setSubscribeState({ setState, getState }: StateContext<ArticlesStateSchema>, { site, value }: SetSubscribeState) {

    const subscribesState = Object.assign({}, getState().subscribesState) as SubscribesState;
    subscribesState[site] = value;
    setState({ ...getState(), subscribesState });

    this.localStorage.saveSubscribes(getState().subscribesState);

  }


}
