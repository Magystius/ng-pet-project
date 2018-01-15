import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {environment} from '../../environments/environment';

@Injectable()
export class MessageService {

  constructor(private notification: MatSnackBar) { }

  public info(message: string): void {
    MessageService._logDebugOutput('INFO', message);
    this.notification.open(message, '', { duration: 2000, panelClass: 'notification-info', horizontalPosition: 'end'});
  }

  public success(message: string): void {
    MessageService._logDebugOutput('SUCCESS', message);
    this.notification.open(message, '', { duration: 2000, panelClass: 'notification-success', horizontalPosition: 'end'});
  }

  public error(message: string): void {
    MessageService._logDebugOutput('ERROR', message);
    this.notification.open(message, '', { duration: 2000, panelClass: 'notification-error', horizontalPosition: 'end'});
  }

  private static _logDebugOutput(level: string, msg: string): void {
    if (!environment.production) {
      console.log(`${level}: ${msg}`);
    }
  }
}
