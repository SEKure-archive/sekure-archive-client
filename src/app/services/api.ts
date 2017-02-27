import {Injectable} from '@angular/core';
import {Http, Headers, Request, RequestOptions, RequestMethod} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/timeout';


/*
RESPONCE  CODES
200  SUCCESS
400	 Invalid JSON
403	 INVALID TOKEN /Email is already in use
*/

@Injectable()
export class APIService{
  private URL = 'http://172.17.0.2:8080';
  private timeOut = 3000;
  private headerTemplate : Headers;

  constructor(private http : Http){
    console.log('Postservice initialized...')
  }


  // Submits all API calls
  private makeRequest (method : RequestMethod, path : string, body : string, authorization: boolean){
    let headers      = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Access-Control-Allow-Origin', '*');

    // authentication not null
    let token :string;
    if (authorization){
      token = localStorage.getItem('id_token');
      headers.append('authorization', token);
      console.log('submit request');
      console.log(token);
    }

    console.log(headers);

    //Data
    let options = new RequestOptions({
      'url': this.URL + path,
      'body': body,  // accepts body as a json string
      'method': method,
      'headers': headers
    });
    console.log(body);

    return this.http.request(new Request(options)).timeout(this.timeOut)
    .timeout(this.timeOut)
    .map((res) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));;
  }

  // *************************   API CALLS ***********************************
  // *************************   USER ACCOUNT ********************************

  // Creates a new user and returns a jws
  // var body = {"email": "userEmail","password": "userPassword"};
  userAdd (email : string , password :string) {
    var body = JSON.stringify({'email': email,'password': password});
    return this.makeRequest(RequestMethod.Post, '/authentication/register', body, false);
  }

  // INPUT: User Name & Password
  // OUTPUT:  returns a id_token
  userLogin (email :string, password : string) {
    var body = JSON.stringify({'email': email,'password': password});
    return this.makeRequest(RequestMethod.Post, '/authentication/login', body, false);
  }
  // *************************   FOLDERS   ********************************
  // INPUT: folder path
  // OUTPUT: folder id
  getFolderID(path:	string) {
    var body = JSON.stringify({'path' : path});
    return this.makeRequest(RequestMethod.Get, '/filesystem/folder', body, true);
  }
  // INPUT: folder path
  // OUTPUT: folder id
  postFolder (path:	string) {
    var body = JSON.stringify({'path' : path});
    return this.makeRequest(RequestMethod.Post, '/filesystem/file', body, true);
  }

  // *************************  Multiple   FOLDERS   **************************
  //  INPUT: id_token  OUTPUT: JSON of all folders
  //  OUTPUT: Array of all folders
  getALLFolders(){
    return this.makeRequest(RequestMethod.Get, '/filesystem/folders', null, true);
  }

  // *************************  Single  FILES   ********************************

  // INPUT: file id
  // OUTPUT: file id : number, folder_id: number, name: string, mime: string
  getFileByID(id:	number) {
    var body = JSON.stringify({'id': id});
    return this.makeRequest(RequestMethod.Get, '/filesystem/file', body, true);
  }
  // INPUT: folder id and file name
  // OUTPUT: file id
  postFile(folder_id:	number, fileName : string) {
    var body = JSON.stringify({'folder_id': folder_id, name: fileName});
    return this.makeRequest(RequestMethod.Post, '/filesystem/file', body, true);
  }

  // ************************* Multiple  FILES   ********************************

  // INPUT: file id
  // OUTPUT: file id : number, folder_id: number, name: string, mime: string
  getFilesWithID(id:	number) {
    var body = JSON.stringify({folder_id: id});
    return this.makeRequest(RequestMethod.Get, '/filesystem/files', body, true);
  }


}
