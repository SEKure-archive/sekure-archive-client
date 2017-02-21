// Test with https://jsonplaceholder.typicode.com/
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/timeout';
// import 'rxjs/add/observable/throw';

@Injectable()
export class PostService{

  // private SEKurl = 'https://jsonplaceholder.typicode.com/posts';
  private SEKurl = 'http://172.17.0.2:8080';

  private testBody{
    "email": "dksddssdskjdds",
    "password": "sddfsjsdd"
  }

  //Class constructor
  constructor(private http : Http){
    console.log('Postservice initialized...')
  }

  // Make API CAll
  // Map Responce to json object
  getPosts(){
    return this.http.get(this.SEKurl + '/filesystem/folders')
    .timeout(3000)
    .map(res => res.json())
  }




  addUser () {
    // var body = {email : 'some@thing.com', password : '1234'};

      let bodyString = JSON.stringify(this.testBody); // Stringify payload
      let headers      = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Access-Control-Allow-Origin', '*')
      let options       = new RequestOptions({ headers: headers });


      return this.http.post(this.SEKurl + '/authentication/register', bodyString,  options) // ...using post request
      // .timeout(3000)
      .map((res) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }




  }
