import {NgModule} from '@angular/core';
import {MatButtonModule, MatCardModule, MatChipsModule, MatSnackBarModule, MatTooltipModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MatCardModule,
    MatSnackBarModule,
    MatChipsModule,
    MatButtonModule,
    MatTooltipModule,
    BrowserAnimationsModule
  ],
  exports: [
    MatCardModule,
    MatSnackBarModule,
    MatChipsModule,
    MatButtonModule,
    MatTooltipModule,
    BrowserAnimationsModule
  ]
})
export class NgMaterialModule {
}
