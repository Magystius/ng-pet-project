import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MatCardModule,
    BrowserAnimationsModule
  ],
  exports: [
    MatCardModule,
    BrowserAnimationsModule
  ]
})
export class NgMaterialModule {
}
