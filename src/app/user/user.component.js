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
var api_services_1 = require('../services/api.services');
var jwt_services_1 = require('../services/jwt.services');
var UserComponent = (function () {
    // Class constructor
    function UserComponent(apiService, jwtService) {
        var _this = this;
        this.apiService = apiService;
        this.jwtService = jwtService;
        console.log('User initialized...');
        var user = 'sean@mcglincy.com';
        var pass = 'hunter322';
        /*
        ***************  API CALL *************************
              Returns observable,  Use subscribe method
        */
        this.apiService.userLogin(user, pass).subscribe(function (data) {
            //Process Data
            _this.jwtService.saveJwt(data.jwt);
            (function () { return console.log('END'); });
        });
        var jwt = this.jwtService.getJwt();
        this.apiService.getALLFolders(jwt).subscribe(function (data) {
            //Process Data
            console.log(data);
            (function () { return console.log('END'); });
        });
        // Variables
        this.file_name = '';
        this.path = '';
        this.mime = {
            type: '',
        };
    }
    UserComponent = __decorate([
        core_1.Component({
            selector: 'sekure-user',
            template: "<h1>Hello</h1>",
            providers: [api_services_1.APIService, jwt_services_1.JWTServices]
        }), 
        __metadata('design:paramtypes', [api_services_1.APIService, jwt_services_1.JWTServices])
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map