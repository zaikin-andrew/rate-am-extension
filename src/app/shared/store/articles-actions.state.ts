import { Site, SiteArticles } from '../interfaces/articles';

export class GetArticles {
  static readonly type = '[ArticlesState] Get sitesArticles';

  constructor() {
  }
}

export class SetArticles {
  static readonly type = '[ArticlesState] Set sitesArticles';

  constructor(public articles: SiteArticles[]) {
  }
}

export class SetArticleIsRead {
  static readonly type = '[ArticlesState] Change Article isRead';

  constructor(public index: number, public isRead: boolean, public site: Site) {
  }
}

export class SetSubscribeState {
  static readonly type = '[ArticlesState] Set subscribe state';

  constructor(public site: Site, public value: boolean) {
  }
}

