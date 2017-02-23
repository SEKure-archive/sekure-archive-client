import {Injectable} from '@angular/core';
import {Http, Headers, Request, RequestOptions, RequestMethod} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/timeout';

@Injectable()
export class APIService{
  private URL = 'http://172.17.0.2:8080';
  private timeOut = 3000;
  private headerTemplate : Headers;

  constructor(private http : Http){
    console.log('Postservice initialized...')
  }

  private makeRequest (method : RequestMethod, path : string, body : string, authorization: string){
    let headers      = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Access-Control-Allow-Origin', '*');

    // authentication
    if (authorization){
      headers.append('authorization', authorization);
    }


    let options = new RequestOptions({
      url: this.URL + path,
      body: body,  // accepts body as a json string
      method: method,
      headers: headers
    });
    return this.http.request(new Request(options)).timeout(this.timeOut)
    .map((res) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));;
  }



  // *************************   API CALLS ***********************************
  // *************************   USER ACCOUNT ********************************

  // Creates a new user and returns a jws
  // var body = {"email": "userEmail","password": "userPassword"};
  postUserAdd (email : string , password :string) {
    var body = JSON.stringify({"email": email,"password": password});
    return this.makeRequest(RequestMethod.Post, '/authentication/register', body, null);
  }

  // INPUT: User Name & Password
  // OUTPUT:  returns a id_token
  postUserLogin (email :string, password : string) {
    var body = JSON.stringify({"email": email,"password": password});
    return this.makeRequest(RequestMethod.Post, '/authentication/login', body, null);
  }


  // *************************   FOLDERS   ********************************
  //  INPUT: id_token  OUTPUT: JSON of all folders
  //  OUTPUT: Array of all folders
  getALLFolders(authorization : string){
    return this.makeRequest(RequestMethod.Get, '/filesystem/folders', null, authorization);
  }

  // *************************   FILES   ********************************

  // INPUT: file id
  // OUTPUT: file
  getFileByID (id:	number, authentication : string) {
    var body = JSON.stringify({id: id});
    return this.makeRequest(RequestMethod.Get, '/filesystem/file', body, authentication);
  }
}
