import {Component, Input, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {timer} from 'rxjs/observable/timer';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-movie-counter',
  template: `
    <h1>Total Movie Counter: <span class="badge badge-success">{{ currentCounterValue }}</span></h1>
  `,
  styles: [`
    h1 {
      padding-top: 20px;
      text-align: center;
    }
  `]
})
export class MovieCounterComponent implements OnDestroy {

  public currentCounterValue = 0;
  private _counterSubject$: Subject<number> = new Subject();
  private _subscription: Subscription;

  constructor() {
    this._subscription = this._counterSubject$
      .switchMap(endRange => {
        this.currentCounterValue = 0;
        return timer(0, 100)
          .mapTo(1)
          .startWith(this.currentCounterValue)
          .scan((acc, currentValue) => acc + currentValue)
          .takeWhile(val => val <= endRange);
      })
      .subscribe(val => this.currentCounterValue = val);
  }

  @Input()
  set movies(endRange: number) {
    this._counterSubject$.next(endRange);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
