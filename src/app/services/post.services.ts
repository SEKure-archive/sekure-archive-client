// Test with https://jsonplaceholder.typicode.com/
import {Injectable} from '@angular/core';
import {Http, Headers, Request, RequestOptions, RequestMethod} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/timeout';

@Injectable()
export class PostService{
  private URL = 'http://172.17.0.2:8080';
  private timeOute = 3000;
  private headerTemplate : Headers;

  // private testBody ={
  //   "email": "dksdsddssdskjdds",
  //   "password": "sddfsjsdd"
  // }
  //Class constructor
  constructor(private http : Http){
    console.log('Postservice initialized...')
  }

// Check if authentication is a string
  private makeRequest (method : RequestMethod, path : string, body : string, authorization : Object){
    let bodyJSON = JSON.stringify(body);
    let headers      = new Headers({ 'Content-Type': 'application/json' });
    headers.append({'Access-Control-Allow-Origin', '*'});
    headers.append({authorization: authorization});

    let options = new RequestOptions({
       url: this.URL,
       body: bodyJSON,
       method: method,
       headers: headers
   });
  return this.http.request(new Request(options)).timeout(this.timeOute)
      .map((res) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));;
  }

  // Make API CAll
  // Map Responce to json object
  getPosts(authentication : authentication){
    // let bodyString = JSON.stringify(authentication);
    let headers = this.headerTemplate;
    headers.append(authentication, authentication);
    let options       = new RequestOptions({ headers: headers });

    return this.http.get(this.URL + '/filesystem/folders')
    .timeout(this.timeOute)
    .map((res) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }



  // Creates a new user and returns a jws
  // var body = {"email": "userEmail","password": "userPassword"};
  addUser (email :string, password : string) {
    let body = JSON.stringify({"email": email,"password": password}); // JSON Request
    let headers      =  this.headerTemplate;
    let options       = new RequestOptions({ headers: headers });

    return this.http.post(this.SEKurl + '/authentication/register', body,  options)
    .timeout(this.timeOute)
    .map((res) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }



  // Other API Calls  Not Tested  *********************************

// User login and returns a jws
// var body = {"email": "userEmail","password": "userPassword"};
userLogin (email :string, password : string) {
  let body = JSON.stringify({"email": email,"password": password}); // JSON Request
  let headers = this.headerTemplate;
  let options       = new RequestOptions({ headers: headers });

  return this.http.post(this.SEKurl + '/authentication/login', body,  options)
  .timeout(this.timeOute)
  .map((res) => res.json())
  .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
}

//  Get  user by ID
getFileByID (id:	number) {
  var body = {id: id};
  // var headers =  (authentication, authentication);
  return makeRequest(RequestMethod.Get, '/filesystem/file', body, authentication);
}



//  Files
    //post
    //get


//  Folders
  //post
  //get


}
