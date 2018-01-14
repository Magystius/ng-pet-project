import {Component} from '@angular/core';

@Component({
  selector: 'app-not-found-page',
  template: `
    <h1>404 - NOT FOUND</h1>
  `,
  styles:[`
    h1 {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      min-height: 100vh;
    }
  `]
})
export class NotFoundPageComponent {

}
