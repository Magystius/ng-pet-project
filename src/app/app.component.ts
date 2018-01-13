import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <nav class="navbar fixed-bottom navbar-expand navbar-light bg-light footer">
      <div class="navbar-text m-auto">
        Made with <i class="fas fa-heart" aria-hidden="true" style="color: red;"></i>️ by /td
      </div>
    </nav>
  `,
  styles: [`
    .footer {
      z-index: 0;
      position: fixed;
    }
  `]
})
export class AppComponent {

}
