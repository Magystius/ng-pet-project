import {NgModule} from '@angular/core';
import {MatCardModule, MatGridListModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MatCardModule,
    MatGridListModule,
    BrowserAnimationsModule
  ],
  exports: [
    MatCardModule,
    MatGridListModule,
    BrowserAnimationsModule
  ]
})
export class NgMaterialModule {
}
