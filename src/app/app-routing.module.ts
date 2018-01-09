import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundPageComponent} from './pages/not-found-page.component';
import {LandingPageComponent} from './pages/landing-page.component';
import {DashboardPageComponent} from './movie/pages/dashboard-page.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'dashboard', component: DashboardPageComponent},
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
