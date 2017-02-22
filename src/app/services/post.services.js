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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/timeout");
var PostService = (function () {
    function PostService(http) {
        this.http = http;
        this.URL = 'http://172.17.0.2:8080';
        this.timeOute = 3000;
        console.log('Postservice initialized...');
    }
    PostService.prototype.makeRequest = function (method, path, body, authorization) {
        var bodyJSON = JSON.stringify(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append({ 'Access-Control-Allow-Origin': , '*':  });
        headers.append({ authorization: authorization });
        var options = new http_1.RequestOptions({
            url: this.URL,
            body: bodyJSON,
            method: method,
            headers: headers
        });
        return this.http.request(new http_1.Request(options)).timeout(this.timeOute)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
        ;
    };
    PostService.prototype.getPosts = function (authentication) {
        var headers = this.headerTemplate;
        headers.append(authentication, authentication);
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this.URL + '/filesystem/folders')
            .timeout(this.timeOute)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    PostService.prototype.addUser = function (email, password) {
        var body = JSON.stringify({ "email": email, "password": password });
        var headers = this.headerTemplate;
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.SEKurl + '/authentication/register', body, options)
            .timeout(this.timeOute)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    PostService.prototype.userLogin = function (email, password) {
        var body = JSON.stringify({ "email": email, "password": password });
        var headers = this.headerTemplate;
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.SEKurl + '/authentication/login', body, options)
            .timeout(this.timeOute)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    PostService.prototype.getFileByID = function (id) {
        var body = { id: id };
        return makeRequest(http_1.RequestMethod.Get, '/filesystem/file', body, authentication);
    };
    return PostService;
}());
PostService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.services.js.map