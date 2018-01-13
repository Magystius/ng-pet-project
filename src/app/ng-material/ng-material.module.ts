import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSnackBarModule, MatSortModule,
  MatTableModule, MatTooltipModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MatCardModule,
    MatSnackBarModule,
    MatChipsModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    BrowserAnimationsModule
  ],
  exports: [
    MatCardModule,
    MatSnackBarModule,
    MatChipsModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    BrowserAnimationsModule
  ]
})
export class NgMaterialModule {
}
