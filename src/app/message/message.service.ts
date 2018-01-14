import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {environment} from '../../environments/environment';

@Injectable()
export class MessageService {

  constructor(private notification: MatSnackBar) { }

  public info(message: string) {
    this._logDebugOutput('INFO', message);
    this.notification.open(message, '', { duration: 2000, panelClass: 'notification-info', horizontalPosition: 'end'});
  }

  public success(message: string) {
    this._logDebugOutput('SUCCESS', message);
    this.notification.open(message, '', { duration: 2000, panelClass: 'notification-success', horizontalPosition: 'end'});
  }

  public error(message: string) {
    this._logDebugOutput('ERROR', message);
    this.notification.open(message, '', { duration: 2000, panelClass: 'notification-error', horizontalPosition: 'end'});
  }

  private _logDebugOutput(level: string, msg: string) {
    if (!environment.production) {
      console.log(`${level}: ${msg}`);
    }
  }
}
