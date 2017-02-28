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


  private folders: folderInterface[];
  //Stor IDs
  private folder: number;
  private file: number;

  constructor(public router: Router, private api: APIService, private user: UserService) {
    this.folder = null;
    this.file = null;
  }

  ngOnInit() {
    this.username = this.user.getUsername();
    // Load folder on page load
    console.log('Firing Homepage On Init');
    this.api.getALLFolders().subscribe(
      data => {
        if (data) {
          console.log(data.status);
          this.folders = data.folders;
        }
      }, err => {
        alert('There was a problem loading the folders.')
      });
  }

  //Load files when Folder clicked
  loadFiles(id: number) {
    this.folder = id;
    this.api.getFilesWithID(id).subscribe(
      data => {
        if (data) {
          console.log(data.status);
          this.folders[id].files= data.files;
          this.folders[id].showFiles= true;

        }
      }, err => {
        alert('There was a problem loading the files.')
      });
  }

  logout() {
    this.user.unsetUser();
    this.router.navigate(['login']);
  }

  showFiles(id: number){
    this.folders.showFiles = !this.folders[id].showFiles;
  }



}

// Interfaces

interface folderInterface {
  showFiles : boolean;
  path: string;
  id: number;
  files: fileInterface[];
}
interface fileInterface {
  id: number;
  name: string;
  folderID: number;
  mime: string;
}
