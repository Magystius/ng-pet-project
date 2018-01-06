import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NgMaterialModule} from './ng-material/ng-material.module';
import {MovieModule} from './movie/movie.module';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryMovieServiceService} from './in-memory-movie-service.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forFeature(InMemoryMovieServiceService, {
      apiBase: 'api/',
      delay: 500,
      delete404: true
    }),
    NgMaterialModule,
    MovieModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
