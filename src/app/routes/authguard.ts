import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
// import {tokenNotExpired} from 'angular2-jwt';
// import {AuthenticationService} from '../services/authentication'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public router: Router) { }

  canActivate() {

    // re-write not to use library.
    // Check time stamp and if it's been tampered
    if (localStorage.getItem('id_token')) {  //check tokent time stamp and if it exists
      return true;     // add more security
    } else {
      this.router.navigate(["login"]);
      return false;
    }
  }
}
