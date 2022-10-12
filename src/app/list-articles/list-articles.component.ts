import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GlbUnsubscribe } from '../core/glb-unsubscribe';
import { Site, SiteArticles, SubscribesState } from '../shared/interfaces/articles';
import { BrowserService } from '../shared/services/browser.service';
import { LocalStorageService } from '../shared/services/localStorage.service';
import { GetArticles, SetArticles } from '../shared/store/articles-actions.state';
import { ArticlesState } from '../shared/store/articles.state';


@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.scss'],
})
export class ListArticlesComponent extends GlbUnsubscribe implements OnInit {

  @Select(ArticlesState.articles)
  public sitesArticles$!: Observable<SiteArticles[]>;

  @Select(ArticlesState.subscribesState)
  public subscribes$!: Observable<SubscribesState>;

  @Output() header = new EventEmitter<string>();


  public subscribes!: SubscribesState;
  public isLoading;

  constructor(private store: Store, private localStorage: LocalStorageService, private browser: BrowserService) {
    super();
    this.isLoading = true;
  }

  sitesArticles: SiteArticles[] = [];


  ngOnInit(): void {
    this.sitesArticles$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(data => {
        console.log(`GET ARTICLES ${new Date().toISOString()}`, data);
        this.sitesArticles = data;
        this.isLoading = false;
      });

    this.subscribes$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(data => {
        this.subscribes = data;
        this.isLoading = true;
      });

    this.getArticles();
    this.browser.setListener(this.store);

  }

  checkIsShow(site: Site): boolean {
    return this.subscribes[site];
  }


  getArticles() {
    const localArticles = this.localStorage.getArticles();
    console.log('articles from local storage: ', localArticles);
    if (localArticles.length) {
      this.store.dispatch(new SetArticles(localArticles));
    }
    this.store.dispatch(new GetArticles());
  }

  checkAllArticlesIsRead() {
    return Object.keys(this.subscribes).some((source) => {
      const site = source as Site;
      if (this.subscribes[site]) {
        const articles = this.sitesArticles.find((value) => value.site == site);
        if (articles) {
          return articles!.articles.some(article =>
            !article.isRead);
        }
        return false;
      }
      return false;
    });
  }
}
