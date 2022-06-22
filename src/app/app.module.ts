import { NgModule, Directive } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TuiRootModule } from '@taiga-ui/core';
import { AppRoutingModule } from './app-routing.module';
import { of } from 'rxjs'
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HttpTokenInterceptor } from './core/interceptors'

import { CoreModule } from '@core/core.module';
import { LayoutModule } from 'src/app/layout/layout.module';


//TaigaUI
import {TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE} from '@taiga-ui/i18n';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TuiRootModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    CommonModule,

    // Core module 
    CoreModule,

    // Layout module of your application
    LayoutModule,

    //Page module

    
  ],
  providers: [
    {
      provide: TUI_LANGUAGE,
      useValue: of(TUI_RUSSIAN_LANGUAGE),
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
