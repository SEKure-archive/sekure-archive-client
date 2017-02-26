// import {Component} from '@angular/core';
// import {Router} from '@angular/router';
// import {APIService} from '../services/services.api';
// import {JWTServices} from '../services/services.jwt';
// import {AuthHttp} from 'angular2-jwt';
// const template = require('../templates/home.html');
//
//
// @Component({
//   selector: 'home',
//   template: template,
//   providers: [APIService, JWTServices]
// })
//
// export class Home{
//   private jwt : string;
//   private decodedJwt :string;
//   private response: string;
//   private api: string;
//
//   constructor(public router: Router, private apiService: APIService, private jwtService:JWTServices){
//     this.jwt = this.jwtService.getJwt();
//     this.decodedJwt = this.jwt &&    window.jwt_decode(this.jwt);  // figure this out
//     }
//
//     logout(){
//       this.jwtService.removeJwt();
//       this.jwt = this.jwtService.getJwt();
//       if(this.jwt){
//         alert('You are not logged out');
//         this.router.navigate(['home']);
//       }
//       else{
//       this.decodedJwt = "";
//       this.router.navigate(['login']);  // Do we want more security function
//     }
//     }
//
//
// }
//# sourceMappingURL=home.js.map