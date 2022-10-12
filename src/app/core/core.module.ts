import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../../environments/environment';

const MODULES = [
  HttpClientModule,
  BrowserModule,
  FormsModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MODULES,
    NgxsModule.forRoot([], { developmentMode: !environment.production }),
  ],
  exports: [
    ...MODULES,
    NgxsModule,
  ],
})
export class CoreModule {
}
