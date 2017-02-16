// Test with https://jsonplaceholder.typicode.com/
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PostService{

  //Class constructor
  constructor(private http : Http){
    console.log('Postservice initialized...')
  }

  // Make API CAll
  // Map Responce to json object
  getPosts(){
    var SEKurl = 'https://jsonplaceholder.typicode.com/posts';
    return this.http.get(SEKurl)
    .map(res => res.json())
    .catch(function(err){
      console.log('Error:  Service post/get API data.  Problem with "map" method.')
      console.log(err);
      return Observable.throw(err.json().err || 'Server error');
    });
  }
}
