import {Injectable} from '@angular/core';

// store file {jwt : keyString}
@Injectable()
export class JWTServices{

  // Saves the token as a string
  saveJwt(jwt : string) {
    if(jwt) {
      localStorage.setItem('id_token', jwt);
    }
  }

  // Returns the token as string
  getJwt() {
      return localStorage.getItem('id_token');

  }
}
