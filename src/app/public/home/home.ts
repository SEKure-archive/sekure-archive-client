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

  ngOnInit() {
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

    private loadFiles(i: number, id: number){
      // this.user.isLoggedIn();
      this.working = true;
      // id--; // ofset
      if(!this.folders[i].loaded){
        this.queryFiles(i, id);

      } else{
        this.showToggle(i);
      }
      this.working = false;
    }


    //Load files when Folder clicked
    private queryFiles(i: number, id: number) {
      this.api.getFolder(id).subscribe(
        data => {
          if (data) {
            this.folders[i].files= data.files;
            // this.folders[id].unique = this.folders[id].unique.filter((x, i, a) => x !== undefined && a.indexOf(x) === i);
            this.folders[i].show = true;
            this.folders[i].loaded = true;
          }
        }, err => {
          this.queryError(err);
        });
      }
      private queryError(err: any){
        if(!this.user.isLoggedIn()){  // Will logout automatic
          this.router.navigate(['login']);
          this.user.setSessionExpired();
        } else {
          alert('There was a problem loading the folders.');
        }
      }

      private showDetails(i: number, j:number){
        // folderID--;
        // fileID--;  // OFFSETS
        if(this.folders[i].files[j].show == null){
          this.folders[i].files[j].show = true;
        }else {
          this.folders[i].files[j].show =   !this.folders[i].files[j].show;
        }
      }

      private logout() {
        this.user.unsetUser();
        this.router.navigate(['login']);
      }

      private showToggle(i : number){
        this.folders[i].show = !this.folders[i].show;
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
      show: boolean;
    }
