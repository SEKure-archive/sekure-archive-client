import {Component} from '@angular/core';
import {Router} from '@angular/router';
// import {AuthenticationService} from '../../services/authentication';
import {APIService} from '../../services/api';

@Component({
  moduleId: module.id,  //Ignore error.  Needed to load templateUrl
  selector : 'login',
  templateUrl: 'login.html',
  providers: [APIService]
})


export class Login{
  private loggedIN :boolean;

  constructor(public router: Router, private apiService:APIService){
    this.loggedIN= false;
  }

  isLoggedIn(){
    return this.loggedIN;
  }

  signup(formSubmit : Event){
    formSubmit.preventDefault();  // prevents default form from HTML.   See login.html
    this.router.navigate(['signup']);
  }


  login(formSubmit : Event, username: string, password: string){
    formSubmit.preventDefault();  // prevents default form from HTML.   See login.html


    // Check user input Here
    // Salt password

    this.apiService.userLogin(username, password)
    .subscribe(
      token =>{
        console.log('Success: logged in....');
        console.log(token);
        localStorage.setItem('id_token', token);
        this.loggedIN = true;
        this.router.navigate(['home']);
      },

      err => {
        this.loggedIN = false;
        localStorage.removeItem('id_token');
        alert('Login failed');
        this.router.navigate(['login']);
      });
  }
}
