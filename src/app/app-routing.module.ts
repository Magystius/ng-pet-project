import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './movie/dashboard.component';
import {NotFoundPageComponent} from './pages/not-found-page.component';
import {LandingPageComponent} from './pages/landing-page.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'dashboard', component: DashboardComponent},
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
