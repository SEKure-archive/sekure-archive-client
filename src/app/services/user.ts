import * as jwt from 'jwt-decode/index';
import { Injectable } from '@angular/core';

const JWT_KEY: string = 'jwt';

/** A service that manages the currently logged in user. */
@Injectable()
export class UserService {
  /** The username of the currently logged in user, if any. */
  private username: string;

  constructor() {
    this.username = null;
  }

  /** Sets the current user and sets authentication information. */
  public setUser(username: string, jwt: string) {
    this.username = username;
    localStorage.setItem(JWT_KEY, jwt);
  }

  /** Unsets the current user and clears authentication information. */
  public unsetUser() {
    this.username = null;
    localStorage.removeItem(JWT_KEY);
  }

  /** Returns the username of the currently logged in user, if any. */
  public getUsername(): string {
    return this.username;
  }

  /** Returns the JWT of the currently logged in user, if any. */
  public getToken(): string {
    return localStorage.getItem(JWT_KEY);
  }

  /** Returns whether there is currently a user logged in (best effort, token could be invalid). */
  public isLoggedIn(): boolean {
    let token = this.getToken();
    if (token) {
      if (jwt(token).exp < new Date().getTime()){
        return true;
      }
       this.unsetUser();
    }
      return false;
  }
}
