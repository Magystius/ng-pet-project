import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule,
  MatProgressSpinnerModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTooltipModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';

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
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    LayoutModule,
    MatProgressSpinnerModule,
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
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    LayoutModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule
  ]
})
export class NgMaterialModule {
}
