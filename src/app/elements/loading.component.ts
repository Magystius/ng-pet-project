import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div class="loading-shade" *ngIf="isLoading">
      <mat-spinner></mat-spinner>
    </div>
  `,
  styles: [`
    .loading-shade {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 56px;
      right: 0;
      background: rgba(0, 0, 0, 0.15);
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class LoadingComponent {

  @Input() public isLoading: boolean;
}
