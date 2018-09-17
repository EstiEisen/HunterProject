import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PublicModule } from './public/public.module';
import { SecureModule } from './secure/secure.module';

import { AppComponent } from './app.component';

import { APP_ROUTES } from './shared/_routes/app.routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    PublicModule,
    SecureModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
