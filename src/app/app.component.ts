import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

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
          <li class="nav-item mr-sm-2">
            <a class="nav-link"><i class="fab fa-angular" aria-hidden="true"></i></a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" name="search" placeholder="..." [(ngModel)]="query" (keyup.enter)="onSearch()">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit" (click)="onSearch()">Search</button>
        </form>
      </div>
    </nav>
    <router-outlet></router-outlet>
    <nav class="navbar fixed-bottom navbar-expand navbar-light bg-light footer">
      <div class="navbar-text m-auto">
        Made with <i class="fas fa-heart" aria-hidden="true" style="color: red;"></i>️ by /td
      </div>
    </nav>
  `,
  styles: [`
    .footer {
      z-index: 0; position: fixed;
    }
  `]
})
export class AppComponent implements OnInit {

  public query: string;

  constructor(private router: Router) {

  }

  ngOnInit(): void {

  }

  public onSearch() {
    this.router.navigate(['results', this.query]);
  }
}
