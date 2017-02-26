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
var api_1 = require('../../services/api');
var Login = (function () {
    function Login(router, apiService) {
        this.router = router;
        this.apiService = apiService;
        this.showLogin = true;
    }
    Login.prototype.ngOnInit = function () {
        // Check JWT when page loaded
        localStorage.getItem('id_token');
        this.router.navigate(['home']);
    };
    Login.prototype.isLoggedIn = function () {
        // return this.loggedIN;
    };
    Login.prototype.toggleLogin = function () {
        if (this.showLogin == true) {
            this.showLogin = false;
        }
        else {
            this.showLogin = true;
        }
    };
    Login.prototype.formSubmitted = function (formSubmit, username, password) {
        formSubmit.preventDefault(); // prevents default form from HTML.   See login.html
        // Check user input Here
        // Salt password
        if (this.showLogin) {
            this.login(username, password);
        }
        else {
            this.signup(username, password);
        }
    };
    Login.prototype.login = function (username, password) {
        var _this = this;
        this.apiService.userLogin(username, password)
            .subscribe(function (data) {
            console.log('Success: logged in....');
            console.log(data);
            localStorage.setItem('id_token', data.jwt);
            _this.router.navigate(['home']);
        }, function (err) {
            localStorage.removeItem('id_token');
            alert('Login failed');
            _this.router.navigate(['login']);
        });
    };
    Login.prototype.signup = function (username, password) {
        var _this = this;
        this.apiService.userAdd(username, password)
            .subscribe(function (data) {
            console.log('Success: logged in....');
            console.log(data);
            localStorage.setItem('id_token', data.jwt);
            _this.router.navigate(['home']);
        }, function (err) {
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