"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/timeout');
/*
RESPONCE  CODES
200  SUCCESS
400	 Invalid JSON
403	 INVALID TOKEN /Email is already in use
*/
var APIService = (function () {
    function APIService(http) {
        this.http = http;
        this.URL = 'http://172.17.0.2:8080';
        this.timeOut = 3000;
        console.log('Postservice initialized...');
    }
    // Submits all API calls
    APIService.prototype.makeRequest = function (method, path, body, authorization) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Access-Control-Allow-Origin', '*');
        // authentication not null
        if (authorization) {
            headers.append('authorization', localStorage.getItem('id_token'));
            console.log('submit request');
            console.log(localStorage.getItem('id_token'));
        }
        //Data
        var options = new http_1.RequestOptions({
            url: this.URL + path,
            body: body,
            method: method,
            headers: headers
        });
        return this.http.request(new http_1.Request(options)).timeout(this.timeOut)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
        ;
    };
    // *************************   API CALLS ***********************************
    // *************************   USER ACCOUNT ********************************
    // Creates a new user and returns a jws
    // var body = {"email": "userEmail","password": "userPassword"};
    APIService.prototype.userAdd = function (email, password) {
        var body = JSON.stringify({ "email": email, "password": password });
        return this.makeRequest(http_1.RequestMethod.Post, '/authentication/register', body, false);
    };
    // INPUT: User Name & Password
    // OUTPUT:  returns a id_token
    APIService.prototype.userLogin = function (email, password) {
        var body = JSON.stringify({ "email": email, "password": password });
        return this.makeRequest(http_1.RequestMethod.Post, '/authentication/login', body, false);
    };
    // *************************   FOLDERS   ********************************
    // INPUT: folder path
    // OUTPUT: folder id
    APIService.prototype.getFolderID = function (path) {
        var body = JSON.stringify({ 'path': path });
        return this.makeRequest(http_1.RequestMethod.Get, '/filesystem/folder', body, true);
    };
    // INPUT: folder path
    // OUTPUT: folder id
    APIService.prototype.postFolder = function (path) {
        var body = JSON.stringify({ 'path': path });
        return this.makeRequest(http_1.RequestMethod.Post, '/filesystem/file', body, true);
    };
    // *************************  Multiple   FOLDERS   **************************
    //  INPUT: id_token  OUTPUT: JSON of all folders
    //  OUTPUT: Array of all folders
    APIService.prototype.getALLFolders = function () {
        return this.makeRequest(http_1.RequestMethod.Get, '/filesystem/folders', null, true);
    };
    // *************************  Single  FILES   ********************************
    // INPUT: file id
    // OUTPUT: file id : number, folder_id: number, name: string, mime: string
    APIService.prototype.getFileByID = function (id) {
        var body = JSON.stringify({ id: id });
        return this.makeRequest(http_1.RequestMethod.Get, '/filesystem/file', body, true);
    };
    // INPUT: folder id and file name
    // OUTPUT: file id
    APIService.prototype.postFile = function (folder_id, fileName) {
        var body = JSON.stringify({ folder_id: folder_id, name: fileName });
        return this.makeRequest(http_1.RequestMethod.Post, '/filesystem/file', body, true);
    };
    // ************************* Multiple  FILES   ********************************
    // INPUT: file id
    // OOUTPUT: Array of files with ID
    // OUTPUT: file id : number, folder_id: number, name: string, mime: string
    APIService.prototype.getFilesWithID = function (id) {
        var body = JSON.stringify({ id: id });
    };
    APIService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], APIService);
    return APIService;
}());
exports.APIService = APIService;
//# sourceMappingURL=api.js.map