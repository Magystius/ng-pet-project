import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class MessageService {

  constructor(private notification: MatSnackBar) { }

  public info(message: string) {
    console.log('INFO: ' + message);
    this.notification.open(message, '', { duration: 2000, panelClass: 'notification-info', horizontalPosition: 'end'});
  }

  public success(message: string) {
    console.log('SUCCESS: ' + message);
    this.notification.open(message, '', { duration: 2000, panelClass: 'notification-success', horizontalPosition: 'end'});
  }

  public error(message: string) {
    console.log('ERROR: ' + message);
    this.notification.open(message, '', { duration: 2000, panelClass: 'notification-error', horizontalPosition: 'end'});
  }
}
