import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MovieService} from './movie.service';
import {NgMaterialModule} from '../ng-material/ng-material.module';
import {MovieCounterComponent} from './movie-counter.component';
import {MessageModule} from '../message/message.module';
import {DashboardPageComponent} from './pages/dashboard-page.component';

@NgModule({
  imports: [
    CommonModule,
    NgMaterialModule,
    MessageModule
  ],
  providers: [
    MovieService
  ],
  declarations: [
    DashboardPageComponent,
    MovieCounterComponent,
  ],
  exports: [
    DashboardPageComponent
  ]
})
export class MovieModule {
}
