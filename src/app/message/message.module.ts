import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageService} from './message.service';
import {NgMaterialModule} from '../ng-material/ng-material.module';

@NgModule({
  imports: [
    CommonModule,
    NgMaterialModule
  ],
  providers: [
    MessageService
  ]
})
export class MessageModule { }
