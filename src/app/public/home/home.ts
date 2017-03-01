import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../../services/api';
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
  private working : boolean;
  private folders: folderInterface[];  //The DATA

  constructor(public router: Router, private api: APIService, private user: UserService) {
  }

  private ngOnInit() {
    this.working = true;
    this.username = this.user.getUsername();
    // Load folder on page load
    console.log('Firing Homepage On Init');
    this.api.getALLFolders().subscribe(
      data => {
        if (data) {
          this.folders = data.folders;
        }
      }, err => {
        this.queryError(err);
      });
      this.working = false;
    }

    private loadFiles(id: number){
      this.working = true;
      id--; // ofset
      if(!this.folders[id].loaded){
        this.queryFiles(id);
      } else{
        this.showToggle(id);
      }
      this.working = false;
    }

    //Load files when Folder clicked
    private queryFiles(id: number) {
      this.api.getFilesWithID(id).subscribe(
        data => {
          if (data) {
            this.folders[id].files= data.files;
            this.folders[id].show = true;
            this.folders[id].loaded = true;
          }
        }, err => {
          this.queryError(err);
        });
      }
      private queryError(err: any){
        if(!this.user.isLoggedIn()){  // Will logout automatic
          this.router.navigate(['login']);
          alert('Your session has expired.');
        } else {
          alert('There was a problem loading the folders.');
        }
      }

      private logout() {
        this.user.unsetUser();
        this.router.navigate(['login']);
      }

      private showToggle(id : number){
        this.folders[id].show = !this.folders[id].show;
      }
    }

    // Interfaces

    interface folderInterface {
      path: string;
      id: number;
      files: fileInterface[];
      loaded : boolean;
      show : boolean;
    }
    interface fileInterface {
      id: number;
      name: string;
      folderID: number;
      mime: string;
    }
