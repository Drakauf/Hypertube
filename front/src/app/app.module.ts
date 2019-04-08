import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ChatComponent } from './components/chat/chat.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';

import { PageNotFoundComponent } from './page_not_found/page_not_found.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  imports: [
  BrowserModule,
  HttpClientModule,
  ReactiveFormsModule,
  AppRouting
  ],
  declarations: [
  AppComponent,
  PageNotFoundComponent,
  HomeComponent,
  HeaderComponent,
  LoginComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
