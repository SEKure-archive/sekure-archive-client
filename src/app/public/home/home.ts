import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {APIService} from '../../services/api';
// import {AuthenticationService} from '../../services/authentication';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.html',
  // template : `   <h1> HOME PAGE</h1>`,
  providers: [APIService]
})

export class Home{


  constructor(public router: Router){
    console.log(localStorage.getItem('Home Page'));
    console.log(localStorage.getItem('id_token'));

  }

  logout(){
    // this.authentication.authLogOut();
  }
}
