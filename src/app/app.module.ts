import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ListArticlesComponent } from './list-articles/list-articles.component';
import { ArticleComponent } from './list-articles/article/article.component';
import { SettingsComponent } from './settings/settings.component';
import { ArticlesState } from './shared/store/articles.state';
import { ChooseSourcesComponent } from './settings/choose-sources/choose-sources.component';
import { SendMessageComponent } from './settings/send-message/send-message.component';

@NgModule({
  declarations: [
    AppComponent,
    ListArticlesComponent,
    ArticleComponent,
    SettingsComponent,
    ChooseSourcesComponent,
    SendMessageComponent,
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    NgxsModule.forFeature([ArticlesState]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
