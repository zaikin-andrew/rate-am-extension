import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListArticlesComponent } from './list-articles/list-articles.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: 'articles', component: ListArticlesComponent,
  },
  {
    path: 'settings', component: SettingsComponent,
  },
  { path: '', pathMatch: 'full', redirectTo: 'articles' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
