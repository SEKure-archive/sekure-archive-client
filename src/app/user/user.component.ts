
import { Component } from '@angular/core';
import { APIService } from '../services/api';

@Component({
  selector: 'sekure-user',
  template: `<h1>Hello</h1>`,
  providers: [APIService]
})
export class UserComponent {
  // Class Variables
  // PostService: PostService;
  file_name: string;
  path: string;
  mime: mimeInterface;


  // Class constructor
  constructor(private apiService: APIService) {
    console.log('User initialized...');

    var user = 'sean@mcglincy.com';
    var pass = 'hunter322';

    /*
    ***************  API CALL *************************
          Returns observable,  Use subscribe method
    */


    // this.apiService.userLogin (user, pass).subscribe(data => {
    //   //Process Data
    //   this.jwtService.saveJwt(data.jwt);
    //   () => console.log('END');
    // });
    //
    // var jwt = this.jwtService.getJwt();
    // this.apiService.getALLFolders(jwt).subscribe(data => {
    //   //Process Data
    //   console.log(data);
    //   () => console.log('END');
    // });


    // Variables
    this.file_name = '';
    this.path = '';
    this.mime = {
      type: '',
    }
  }


}
// Structure for the mime interface
interface mimeInterface {
  type: string;
}
