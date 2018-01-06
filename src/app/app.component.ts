import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-expand navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" routerLink="/">NG Movie App</a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" routerLinkActive="active">
            <a class="nav-link" routerLink="/dashboard">Dashboard</a>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link"><i class="fab fa-angular" aria-hidden="true"></i></a>
          </li>
        </ul>
      </div>
    </nav>

    <router-outlet></router-outlet>

    <nav class="navbar fixed-bottom navbar-expand navbar-light bg-light">
      <div class="navbar-text m-auto">
        Made with <i class="fas fa-heart" aria-hidden="true" style="color: red;"></i>️ by /td
      </div>
    </nav>
  `
})
export class AppComponent implements OnInit {

  ngOnInit(): void {

  }
}
