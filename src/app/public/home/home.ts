import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../../services/api';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.html',
  providers: [APIService]
})

export class Home implements OnInit {
  private folders: string[];
  private folder: folderInterface;

  private files: fileInterface[];
  private file: fileInterface;


  constructor(public router: Router, private apiService: APIService) {
    console.log('Starting Home Page');
    console.log(localStorage.getItem('id_token'));
  }

  ngOnInit() {
    // Load folder on page load
    console.log('Firing Homepage On Init');
    this.apiService.getALLFolders().subscribe(
      data => {
        if (data) {
          console.log(data.status);
          this.folders = data.folders;
        }
      },
      err => {
        alert('There was a problem loading the folders.')
      });
  }



  //Load files when Folder clicked
  loadFiiles(id: number) {
    console.log('Firing Load Files');
    console.log(id);
    this.apiService.getFilesWithID(id).subscribe(
      data => {
        if (data) {
          console.log(data);
          // this.files = data.file;
        }
      },
      err => {
        alert('There was a problem loading the files.')
      });
  }

  logout() {
    localStorage.removeItem('id_token');
    this.router.navigate(['login']);
  }


}
// Interfaces
interface folderInterface {
  path: string;
  id: number;
}
interface fileInterface {
  id: number;
  name: string;
  folderID: number;
  mime: {
    type: string,
  }
}
