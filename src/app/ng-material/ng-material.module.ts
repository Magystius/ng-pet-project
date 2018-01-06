import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MatToolbarModule,
    BrowserAnimationsModule
  ],
  exports: [
    MatToolbarModule,
    BrowserAnimationsModule
  ]
})
export class NgMaterialModule {
}
