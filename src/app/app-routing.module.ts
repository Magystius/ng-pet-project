import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundPageComponent} from './pages/not-found-page.component';
import {LandingPageComponent} from './pages/landing-page.component';
import {ResultsPageComponent} from './movie/pages/results-page.component';
import {DashboardPageComponent} from './movie/pages/dashboard-page.component';
import {OverviewPageComponent} from './movie/pages/overview-page.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'dashboard', component: DashboardPageComponent},
  {path: 'overview', component: OverviewPageComponent},
  {path: 'results/:query', component: ResultsPageComponent},
  {path: '*', component: NotFoundPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
