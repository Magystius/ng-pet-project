import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NgMaterialModule} from './ng-material/ng-material.module';
import {MovieModule} from './movie/movie.module';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryMovieServiceService} from './in-memory-movie-service.service';
import {AppRoutingModule} from './app-routing.module';
import {LandingPageComponent} from './pages/landing-page.component';
import {NotFoundPageComponent} from './pages/not-found-page.component';
import {MessageModule} from './message/message.module';
import {FormsModule} from '@angular/forms';
import {NavbarComponent} from './elements/navbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NotFoundPageComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forFeature(InMemoryMovieServiceService, {
      apiBase: 'api/',
      delay: 2000,
      delete404: true
    }),
    FormsModule,
    NgMaterialModule,
    AppRoutingModule,
    MovieModule,
    MessageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
