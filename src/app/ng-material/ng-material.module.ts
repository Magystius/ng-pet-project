import {NgModule} from '@angular/core';
import {MatButtonModule, MatCardModule, MatChipsModule, MatSnackBarModule, MatTableModule, MatTooltipModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MatCardModule,
    MatSnackBarModule,
    MatChipsModule,
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
    BrowserAnimationsModule
  ],
  exports: [
    MatCardModule,
    MatSnackBarModule,
    MatChipsModule,
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
    BrowserAnimationsModule
  ]
})
export class NgMaterialModule {
}
