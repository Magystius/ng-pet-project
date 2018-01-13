import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule,
  MatProgressSpinnerModule, MatSelectModule, MatSliderModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTooltipModule
} from '@angular/material';
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
    MatSelectModule,
    MatSliderModule,
    LayoutModule,
    MatProgressSpinnerModule
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
    MatSelectModule,
    MatSliderModule,
    LayoutModule,
    MatProgressSpinnerModule
  ]
})
export class NgMaterialModule {
}
