import {NgModule} from '@angular/core';
import {MatButtonModule, MatCardModule, MatChipsModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTooltipModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MatCardModule,
    MatSnackBarModule,
    MatChipsModule,
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    BrowserAnimationsModule
  ],
  exports: [
    MatCardModule,
    MatSnackBarModule,
    MatChipsModule,
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    BrowserAnimationsModule
  ]
})
export class NgMaterialModule {
}
