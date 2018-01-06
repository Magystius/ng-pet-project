import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MovieService} from './movie.service';
import {DashboardComponent} from './dashboard.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    MovieService
  ],
  declarations: [
    DashboardComponent
  ],
  exports: [
    DashboardComponent
  ]
})
export class MovieModule {
}
