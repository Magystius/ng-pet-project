import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MovieService} from './movie.service';
import {NgMaterialModule} from '../ng-material/ng-material.module';
import {MovieCounterComponent} from './movie-counter.component';
import {MessageModule} from '../message/message.module';
import {MovieListComponent} from './movie-list/movie-list.component';
import {DashboardPageComponent} from './pages/dashboard-page/dashboard-page.component';
import {ResultsPageComponent} from './pages/results-page.component';
import {FormsModule} from '@angular/forms';
import {CapitalizePipe} from '../pipes/capitalize.pipe';
import {TrimPipe} from '../pipes/trim.pipe';
import {ListPipe} from '../pipes/list.pipe';
import {LoadingComponent} from '../elements/loading.component';
import {OverviewPageComponent} from './pages/overview-page/overview-page.component';
import {MovieFormComponent} from './movie-form/movie-form.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    NgMaterialModule,
    MessageModule
  ],
  providers: [
    MovieService
  ],
  declarations: [
    DashboardPageComponent,
    MovieCounterComponent,
    ResultsPageComponent,
    MovieListComponent,
    CapitalizePipe,
    TrimPipe,
    ListPipe,
    LoadingComponent,
    OverviewPageComponent,
    MovieFormComponent
  ],
  exports: [
    DashboardPageComponent,
    ResultsPageComponent,
    OverviewPageComponent
  ]
})
export class MovieModule {
}
