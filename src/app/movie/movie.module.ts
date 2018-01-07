import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MovieService} from './movie.service';
import {DashboardComponent} from './dashboard.component';
import {NgMaterialModule} from '../ng-material/ng-material.module';
import {MovieCounterComponent} from './movie-counter.component';

@NgModule({
  imports: [
    CommonModule,
    NgMaterialModule
  ],
  providers: [
    MovieService
  ],
  declarations: [
    DashboardComponent,
    MovieCounterComponent
  ],
  exports: [
    DashboardComponent
  ]
})
export class MovieModule {
}