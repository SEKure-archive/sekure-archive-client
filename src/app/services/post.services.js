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
// Test with https://jsonplaceholder.typicode.com/
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/timeout');
// import 'rxjs/add/observable/throw';
var PostService = (function () {
    //Class constructor
    function PostService(http) {
        this.http = http;
        // private SEKurl = 'https://jsonplaceholder.typicode.com/posts';
        this.SEKurl = 'http://172.17.0.2:8080';
        this.testBody = {
            "email": "dksdsddssdskjdds",
            "password": "sddfsjsdd"
        };
        console.log('Postservice initialized...');
    }
    // Make API CAll
    // Map Responce to json object
    PostService.prototype.getPosts = function () {
        return this.http.get(this.SEKurl + '/filesystem/folders')
            .timeout(3000)
            .map(function (res) { return res.json(); });
    };
    PostService.prototype.addUser = function () {
        // var body = {email : 'some@thing.com', password : '1234'};
        var bodyString = JSON.stringify(this.testBody); // Stringify payload
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Access-Control-Allow-Origin', '*');
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.SEKurl + '/authentication/register', bodyString, options) // ...using post request
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    PostService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PostService);
    return PostService;
}());
exports.PostService = PostService;
//# sourceMappingURL=post.services.js.map