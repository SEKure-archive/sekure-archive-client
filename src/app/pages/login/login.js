// import {Component} from '@angular/core';
// import {Router} from '@angular/router';
// import {JWTServices} from '../services/services.jwt';
// import {APIService} from '../services/services.api';
//
// const template = require('../templates/login.html');
//
// @Component({
//   selector : 'login',
//   template : template,
//     providers: [APIService, JWTServices]
// })
//
// export class Login{
//   constructor(public router: Router, private apiService : APIService, private jwtService : JWTServices){
//
//   }
//
//   signup(event){
//     event.preventDefault();
//   this.router.navigate(['signup']);
// }
//
// /*
// ***************   TO DO ************************
// Add password salting and more security checks
// ***************   TO DO ************************
// */
//   login(event: string, username: string, password: string){
//     event.preventDefault();  // make functions
//     this.apiService.userLogin(username, password)
//     .subscribe(
//       jwt =>{
//     this.jwtService.saveJwt(jwt);
//     this.router.navigate(['home']);
//   },
//
//     err => {
//       alert('Login failed');
//       this.router.navigate(['login']);
//
//     });
//
//   }
// }
//# sourceMappingURL=login.js.map