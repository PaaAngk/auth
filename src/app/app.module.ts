import { NgModule, Directive } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TuiRootModule } from '@taiga-ui/core';
import { AppRoutingModule } from './app-routing.module';
import { of } from 'rxjs'
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { HeaderComponent, FooterComponent, SharedModule } from './shared'
import { HttpTokenInterceptor } from './core/interceptors'

//TaigaUI
import {TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE} from '@taiga-ui/i18n';
import {TuiTabsModule } from '@taiga-ui/kit';
import {TuiHostedDropdownModule, TuiSvgModule, TuiDataListModule, TuiNotificationModule} from '@taiga-ui/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    
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

    //Page module
    HomeModule,
    AuthModule,
    UserModule,
    SharedModule,


    //UI
    TuiTabsModule,
    TuiHostedDropdownModule,
    TuiSvgModule,
    TuiDataListModule,
    TuiNotificationModule,
    
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
