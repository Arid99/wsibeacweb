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
var MsalService = (function () {
    function MsalService() {
        this.B2CTodoAccessTokenKey = "b2c.todo.access.token";
        this.tenantConfig = {
            tenant: "wsibeac.onmicrosoft.com",
            clientID: '00c35ee9-bda8-4711-8025-79364faaad54',
            signUpSignInPolicy: "B2C_1_SiUpInPolicy",
            b2cScopes: ["https://eacadb2cpoc.onmicrosoft.com/demoapi/demo.read"]
        };
        // Configure the authority for Azure AD B2C
        this.authority = "https://login.microsoftonline.com/tfp/" + this.tenantConfig.tenant + "/" + this.tenantConfig.signUpSignInPolicy;
        /*
         * B2C SignIn SignUp Policy Configuration
         */
        this.clientApplication = new Msal.UserAgentApplication(this.tenantConfig.clientID, this.authority, function (errorDesc, token, error, tokenType) {
            // Called after loginRedirect or acquireTokenPopup
        });
    }
    MsalService.prototype.login = function () {
        var _this = this;
        this.clientApplication.loginPopup(this.tenantConfig.b2cScopes).then(function (idToken) {
            _this.clientApplication.acquireTokenSilent(_this.tenantConfig.b2cScopes).then(function (accessToken) {
                _this.saveAccessTokenToCache(accessToken);
            }, function (error) {
                _this.clientApplication.acquireTokenPopup(_this.tenantConfig.b2cScopes).then(function (accessToken) {
                    _this.saveAccessTokenToCache(accessToken);
                }, function (error) {
                    bootbox.alert("Error acquiring the popup:\n" + error);
                });
            });
        }, function (error) {
            bootbox.alert("Error during login:\n" + error);
        });
    };
    MsalService.prototype.saveAccessTokenToCache = function (accessToken) {
        sessionStorage.setItem(this.B2CTodoAccessTokenKey, accessToken);
    };
    ;
    MsalService.prototype.logout = function () {
        this.clientApplication.logout();
    };
    ;
    MsalService.prototype.isOnline = function () {
        return this.clientApplication.getUser() != null;
    };
    ;
    MsalService = __decorate([
        core_1.Injectable(),
        __metadata('design:paramtypes', [])
    ], MsalService);
    return MsalService;
}());
exports.MsalService = MsalService;
