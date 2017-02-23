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
var APIService = (function () {
    function APIService(http) {
        this.http = http;
        this.URL = 'http://172.17.0.2:8080';
        this.timeOut = 3000;
        console.log('Postservice initialized...');
    }
    APIService.prototype.makeRequest = function (method, path, body, authorization) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Access-Control-Allow-Origin', '*');
        // authentication
        if (authorization) {
            headers.append('authorization', authorization);
        }
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
    APIService.prototype.postUserAdd = function (email, password) {
        var body = JSON.stringify({ "email": email, "password": password });
        return this.makeRequest(http_1.RequestMethod.Post, '/authentication/register', body, null);
    };
    // INPUT: User Name & Password
    // OUTPUT:  returns a id_token
    APIService.prototype.postUserLogin = function (email, password) {
        var body = JSON.stringify({ "email": email, "password": password });
        return this.makeRequest(http_1.RequestMethod.Post, '/authentication/login', body, null);
    };
    // *************************   FOLDERS   ********************************
    //  INPUT: id_token  OUTPUT: JSON of all folders
    //  OUTPUT: Array of all folders
    APIService.prototype.getALLFolders = function (authorization) {
        return this.makeRequest(http_1.RequestMethod.Get, '/filesystem/folders', null, authorization);
    };
    // *************************   FILES   ********************************
    // INPUT: file id
    // OUTPUT: file
    APIService.prototype.getFileByID = function (id, authentication) {
        var body = JSON.stringify({ id: id });
        return this.makeRequest(http_1.RequestMethod.Get, '/filesystem/file', body, authentication);
    };
    APIService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], APIService);
    return APIService;
}());
exports.APIService = APIService;
//# sourceMappingURL=api.services.js.map