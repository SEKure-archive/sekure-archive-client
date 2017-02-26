import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {APIService} from '../../services/api';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.html',
  providers: [APIService]
})

export class Home implements OnInit{
  private folders: string[];


  constructor(public router: Router, private apiService: APIService){
    console.log('Starting Home Page');
    console.log(localStorage.getItem('id_token'));

  }

  ngOnInit(){
    console.log('Firing Homepage On Init');
    this.apiService.getALLFolders().subscribe(data => {
      console.log(data);
      this.folders = data.folders;
    });
  }

  logout(){
    localStorage.removeItem('id_token');
    this.router.navigate(['login']);
  }
}
