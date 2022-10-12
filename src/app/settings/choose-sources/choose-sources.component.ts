import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GlbUnsubscribe } from '../../core/glb-unsubscribe';
import { Site, SubscribesState } from '../../shared/interfaces/articles';
import { LocalStorageService } from '../../shared/services/localStorage.service';
import { GetArticles, SetArticles, SetSubscribeState } from '../../shared/store/articles-actions.state';
import { ArticlesState } from '../../shared/store/articles.state';

@Component({
  selector: 'app-choose-sources',
  templateUrl: './choose-sources.component.html',
  styleUrls: ['./choose-sources.component.scss'],
})
export class ChooseSourcesComponent extends GlbUnsubscribe implements OnInit {
  @Select(ArticlesState.subscribesState)
  public subscribes$!: Observable<SubscribesState>;

  public subscribes!: SubscribesState;

  constructor(private store: Store, private localStorage: LocalStorageService) {
    super();
  }

  ngOnInit(): void {
    this.subscribes$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(data => {
        this.subscribes = Object.assign({}, data) as SubscribesState;
      });

  }

  updateSubscribes(site: Site, value: boolean) {
    this.store.dispatch(new SetSubscribeState(site, value));
    const localArticles = this.localStorage.getArticles();
    localArticles.length ?
      this.store.dispatch(new SetArticles(localArticles)) :
      this.store.dispatch(new GetArticles());
  }

}
