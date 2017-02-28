import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../../services/api';

@Component({
  moduleId: module.id,  //Ignore error.  Needed to load templateUrl
  selector: 'login',
  templateUrl: 'login.html',
  styleUrls: ['login.css'],
  providers: [APIService]
})
export class Login implements OnInit {
  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;

  private showLogin: boolean;
  private usernameError: string;
  private passwordError: string;

  constructor(public router: Router, private apiService: APIService) {
    this.showLogin = true;
    this.usernameError = null;
    this.passwordError = null;
  }

  ngOnInit() {
    // Check JWT when page loaded
    localStorage.getItem('id_token');
    this.router.navigate(['home']);
  }

  isLoggedIn() {
    // return this.loggedIN;
  }

  private toggleLogin() {
    if (this.showLogin == true) {
      this.showLogin = false;
    } else {
      this.showLogin = true;
    }
    this.username.nativeElement.value = '';
    this.password.nativeElement.value = '';
    this.usernameError = null;
    this.passwordError = null;
  }

  formSubmitted(formSubmit: Event, username: string, password: string) {
    formSubmit.preventDefault();  // prevents default form from HTML.   See login.html
    // Check user input Here
    // Salt password
    if (this.showLogin) {
      this.login(username, password);
    } else {
      this.signup(username, password);
    }

  }

  private login(username: string, password: string) {
    this.apiService.userLogin(username, password)
      .subscribe(
      data => {
        console.log('Success: logged in....');
        console.log(data);
        localStorage.setItem('id_token', data.jwt);
        this.router.navigate(['home']);
      },

      err => {
        localStorage.removeItem('id_token');
        this.passwordError = 'Invalid username or password.';
      });
  }

  private signup(username: string, password: string) {
    // Client-side check of username and password
    if (username.length == 0) {
      this.usernameError = 'Username must not be empty.';
    } else {
      this.usernameError = null;
    }
    if (password.length < 8) {
      this.passwordError = 'Password must be at least 8 characters long.';
    } else if (password.length > 72) {
      this.passwordError = 'Password must be no more than 72 characters long.';
    } else {
      this.passwordError = null;
    }

    // Attempt to register if the username and password seem to be OK
    if (this.usernameError == null && this.passwordError == null) {
      this.apiService.userAdd(username, password)
        .subscribe(
        data => {
          console.log('Success: logged in....');
          console.log(data);
          localStorage.setItem('id_token', data.jwt);
          this.router.navigate(['home']);
        },

        err => {
          localStorage.removeItem('id_token');
          this.usernameError = err;
        });
    }
  }
}
