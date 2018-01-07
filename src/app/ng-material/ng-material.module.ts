import {NgModule} from '@angular/core';
import {MatCardModule, MatSnackBarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MatCardModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  exports: [
    MatCardModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ]
})
export class NgMaterialModule {
}
