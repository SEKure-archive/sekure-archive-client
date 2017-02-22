import { Component } from '@angular/core';
import {PostService} from '../services/post.services';
@Component({
  selector: 'sekure-user',
  template: `<h1>Hello</h1>`,
  providers: [PostService]
})
export class UserComponent  {
  // Class Variables
  PostService: PostService;
  file_name: string;
  path: string;
  mime: mimeInterface;


  // Class constructor
  constructor(private postService : PostService){
    console.log('User initialized...');


/*
***************  API CALL *************************
      Returns observable,  Use subscribe method
*/

    this.postService.addUser ("dksdsddssdskjdds", "sddfsjsdd").subscribe(posts => {
      //Process Data
      console.log(posts);
      () => console.log('END');
    });

    // Variables
    this.file_name = '';
    this.path = '';
    this.mime = {
      type: '',
    }
  }
}
// Structure for the mime interface
interface mimeInterface{
  type: string;
}
