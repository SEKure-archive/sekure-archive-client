//Routes for Library Functions
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http'

//Routes for Components
import { AppComponent }  from './app.component';
import {UserComponent} from './user/user.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule ],  //Declare Library functions
  declarations: [ AppComponent, UserComponent ],  //Declare components and sub components
  bootstrap:    [ AppComponent, UserComponent ]  //Declare to use in main html
})
export class AppModule { }
