import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class MessageService {

  constructor(private notification: MatSnackBar) { }

  public show(message: string) {
    this.notification.open(message, '', { duration: 2000, panelClass: 'notification', horizontalPosition: 'end'});
  }
}
