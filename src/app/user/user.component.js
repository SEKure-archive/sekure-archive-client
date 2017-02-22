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
var post_services_1 = require("../services/post.services");
var UserComponent = (function () {
    function UserComponent(postService) {
        this.postService = postService;
        console.log('User initialized...');
        this.postService.addUser("dksdsddssdskjdds", "sddfsjsdd").subscribe(function (posts) {
            console.log(posts);
            (function () { return console.log('END'); });
        });
        this.file_name = '';
        this.path = '';
        this.mime = {
            type: '',
        };
    }
    return UserComponent;
}());
UserComponent = __decorate([
    core_1.Component({
        selector: 'sekure-user',
        template: "<h1>Hello</h1>",
        providers: [post_services_1.PostService]
    }),
    __metadata("design:paramtypes", [post_services_1.PostService])
], UserComponent);
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map