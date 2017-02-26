import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {APIService} from '../../services/api';

@Component({
  moduleId: module.id,  //Ignore error.  Needed to load templateUrl
  selector : 'login',
  templateUrl: 'login.html',
  providers: [APIService]
})


export class Login implements OnInit{
  private showLogin: boolean;

  constructor(public router: Router, private apiService:APIService){
    this.showLogin= true;
  }
  ngOnInit(){
    // Check JWT when page loaded
    localStorage.getItem('id_token');
    this.router.navigate(['home']);
  }

  isLoggedIn(){
    // return this.loggedIN;
  }

  private toggleLogin(){
    if(this.showLogin == true){
      this.showLogin = false;
    } else{
      this.showLogin = true;
    }
  }
  formSubmitted(formSubmit : Event, username: string, password: string){
    formSubmit.preventDefault();  // prevents default form from HTML.   See login.html
    // Check user input Here
    // Salt password
    if(this.showLogin){
      this.login(username, password);
    } else {
      this.signup(username, password);
    }

  }

  private login(username: string, password: string){
    this.apiService.userLogin(username, password)
    .subscribe(
      data =>{
        console.log('Success: logged in....');
        console.log(data);
        localStorage.setItem('id_token', data.jwt);
        this.router.navigate(['home']);
      },

      err => {
        localStorage.removeItem('id_token');
        alert('Login failed');
        this.router.navigate(['login']);
      });
  }


  private signup(username: string, password: string){
    this.apiService.userAdd(username, password)
    .subscribe(
      data =>{
        console.log('Success: logged in....');
        console.log(data);
        localStorage.setItem('id_token', data.jwt);
        this.router.navigate(['home']);
      },

      err => {
        localStorage.removeItem('id_token');
        alert('Login failed');
        this.router.navigate(['login']);
      });
  }
}
