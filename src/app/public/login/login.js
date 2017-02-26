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
var router_1 = require('@angular/router');
// import {AuthenticationService} from '../../services/authentication';
var api_1 = require('../../services/api');
var Login = (function () {
    function Login(router, apiService) {
        this.router = router;
        this.apiService = apiService;
        this.loggedIN = false;
    }
    Login.prototype.isLoggedIn = function () {
        return this.loggedIN;
    };
    Login.prototype.signup = function (formSubmit) {
        formSubmit.preventDefault(); // prevents default form from HTML.   See login.html
        this.router.navigate(['signup']);
    };
    Login.prototype.login = function (formSubmit, username, password) {
        var _this = this;
        formSubmit.preventDefault(); // prevents default form from HTML.   See login.html
        // Check user input Here
        // Salt password
        this.apiService.userLogin(username, password)
            .subscribe(function (token) {
            console.log('Success: logged in....');
            console.log(token);
            localStorage.setItem('id_token', token);
            _this.loggedIN = true;
            _this.router.navigate(['home']);
        }, function (err) {
            _this.loggedIN = false;
            localStorage.removeItem('id_token');
            alert('Login failed');
            _this.router.navigate(['login']);
        });
    };
    Login = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login',
            templateUrl: 'login.html',
            providers: [api_1.APIService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, api_1.APIService])
    ], Login);
    return Login;
}());
exports.Login = Login;
//# sourceMappingURL=login.js.map