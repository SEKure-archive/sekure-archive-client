//Routes for Library Functions
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

// providers
// import { AuthGuard } from './common/auth.guard';
// import { AUTH_PROVIDERS } from 'angular2-jwt';  //File not found

//Routes for Components
import { AppComponent }  from './app.component';
import {UserComponent} from './user/user.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule],  //Declare Library functions
  // providers: [  AUTH_PROVIDERS],
  declarations: [ AppComponent, UserComponent ],  //Declare components and sub components
  bootstrap:    [ AppComponent, UserComponent ]  //Declare to use in main html
})
export class AppModule { }
