import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService, Folder } from '../../services/api';
import { UserService } from '../../services/user';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.html',
  styleUrls: ['home.css'],
  providers: [APIService]
})

export class Home implements OnInit {
  public username: string;
  private working: boolean;
  private folders: Folder[];

  constructor(public router: Router, private api: APIService, private user: UserService) { }

  ngOnInit() {
    this.working = true;
    this.username = this.user.getUsername();
    // Load folders on page load
    console.log('Firing Homepage On Init');
    this.api.getALLFolders().subscribe(folders => {
      this.folders = folders;
      this.working = false;
    }, err => {
      if (!this.user.isLoggedIn()) {
        this.router.navigate(['login']);
        this.user.setSessionExpired();
      } else {
        this.working = false;
        alert('There was a problem loading the folders.');
      }
    });
  }

  private logout() {
    this.user.unsetUser();
    this.router.navigate(['login']);
  }
}
