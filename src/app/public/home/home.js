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
var Home = (function () {
    function Home(router, apiService) {
        this.router = router;
        this.apiService = apiService;
        console.log('Starting Home Page');
        console.log(localStorage.getItem('id_token'));
    }
    Home.prototype.ngOnInit = function () {
        var _this = this;
        // Load folder on page load
        console.log('Firing Homepage On Init');
        this.apiService.getALLFolders().subscribe(function (data) {
            if (data) {
                console.log(data.status);
                _this.folders = data.folders;
            }
        }, function (err) {
            alert('There was a problem loading the folders.');
        });
    };
    //Load files when Folder clicked
    Home.prototype.loadFiiles = function (id) {
        var _this = this;
        console.log('Firing Load Files');
        console.log(id);
        this.apiService.getFilesWithID(id).subscribe(function (data) {
            if (data) {
                console.log(data.status);
                _this.files = data.file;
            }
        }, function (err) {
            alert('There was a problem loading the files.');
        });
    };
    Home.prototype.logout = function () {
        localStorage.removeItem('id_token');
        this.router.navigate(['login']);
    };
    Home = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home',
            templateUrl: 'home.html',
            providers: [api_1.APIService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, api_1.APIService])
    ], Home);
    return Home;
}());
exports.Home = Home;
//# sourceMappingURL=home.js.map