//Routes for Library Functions
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// providers
import { AuthGuard } from './routes/authguard';
import { APIService } from './services/api';
import { UserService } from './services/user';

//Routes for Components
import { AppComponent } from './app.component';
// import {UserComponent} from './user/user.component';

// Pages
import { routing } from './routes/routes';
import { Home } from './public/home/home';
import { Login } from './public/login/login';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, routing],    //Declare Library functions
  providers: [AuthGuard, APIService, UserService],
  declarations: [AppComponent, Home, Login],  //Declare components and sub components
  bootstrap: [AppComponent]  //Declare to use in main html
})
export class AppModule { }
