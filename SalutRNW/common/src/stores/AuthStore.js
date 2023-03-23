"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthStore = void 0;
var async_storage_1 = require("@react-native-async-storage/async-storage");
var mobx_1 = require("mobx");
var mobx_persist_store_1 = require("mobx-persist-store");
var AuthStore = /** @class */ (function () {
    function AuthStore(rootStore) {
        this.authorized = false;
        this.userId = '';
        this.accessToken = '';
        this.userEmail = '';
        this.rootStore = rootStore;
        (0, mobx_1.makeObservable)(this, {
            authorized: mobx_1.observable,
            userId: mobx_1.observable,
            accessToken: mobx_1.observable,
            userEmail: mobx_1.observable,
            authorize: mobx_1.action,
            logout: mobx_1.action,
        });
        (0, mobx_persist_store_1.makePersistable)(this, {
            name: 'AuthStore',
            properties: [
                'userId',
                'authorized',
                'accessToken',
                'userEmail',
            ],
            storage: async_storage_1.default,
        });
    }
    AuthStore.prototype.authorize = function (user) {
        this.authorized = true;
        this.accessToken = user.accessToken;
        this.userId = user.userId;
        this.userEmail = user.email;
    };
    AuthStore.prototype.logout = function () {
        this.authorized = false;
        this.accessToken = '';
        this.userId = '';
        this.userEmail = '';
    };
    return AuthStore;
}());
exports.AuthStore = AuthStore;
