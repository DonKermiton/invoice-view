import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './auth/store/auth.effect';
import { StoreModule } from '@ngrx/store';
import { loggedUserReducers } from './auth/store/auth.reducers';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from "./share/http/http.interceptor";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    StoreModule.forRoot(loggedUserReducers),
    EffectsModule.forRoot([AuthEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptor
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}