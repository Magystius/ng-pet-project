import {Component} from '@angular/core';

@Component({
  selector: 'app-landing-page',
  template: `
    <div class="container">
      <div class="starter-template">
        <h1>Movie <i class="fas fa-film fa-lg" style="color: saddlebrown;"></i> App</h1>
        <p class="lead">Make movies great again! - TV Shows also!</p>
        <a role="button" class="btn btn-primary btn-lg starter-button" routerLink="/dashboard">Take me to the dashboard!</a>
      </div>
    </div>
  `,
  styles: [`
    .starter-template {
      padding: 3rem 1.5rem;
      text-align: center;
    }

    .starter-button {
      margin-top: 2rem;
    }
  `]
})
export class LandingPageComponent {

}
