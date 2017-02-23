import { Component } from '@angular/core';
import {Injectable} from '@angular/core';

// store file {jwt : keyString}
@Injectable()
export class JWTServices{
  saveJwt(jwt : string) {
    if(jwt) {
      localStorage.setItem('id_token', jwt);
    }
  }
  getJwt() {
      return localStorage.getItem('id_token');

  }
}
